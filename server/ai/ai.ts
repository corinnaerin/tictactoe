import { Move, MoveFinder, Player } from '../../common/types';
import Board from '../../common/Board';
import { emptyRowAndColumn, middleSquare, randomSquare } from './board-move-finders';
import { firstInLine, lastInLine, secondInLine, winningMove } from './line-move-finders';
import MoveUtil from '../util/move-util';
import TicTacToeUtil from '../util/tic-tac-toe-util';
import RandomUtil from '../util/random-util';
import createError = require('http-errors');

export default class AI {
  /**
   * This details the preferred order to make a move for the Hard difficulty level
   * The algorithm will go through the list and find the first one that returns a move,
   * ensuring we always return the most optimal move
   * @type {MoveFinder[]}
   */
  public static HARD_PREFERRED_MOVES: MoveFinder[] = [
    { // 1: A winning move for the AI
      lineMoveFinder: winningMove,
      args: [Player.AI]
    },
    { // 2: Block a winning move for the user
      lineMoveFinder: winningMove,
      args: [Player.User]
    },
    { // 3: Pick the middle square, since that gives the most possible ways to win
      boardMoveFinder: middleSquare
    },
    { // 4: Pick a line that we already have one claimed in
      lineMoveFinder: secondInLine,
      args: Player.AI
    },
    {
      // 5: Pick a square that is empty in both row and column
      boardMoveFinder: emptyRowAndColumn
    },
    {
      // 6: First in an empty line, randomly pick an open square
      lineMoveFinder: firstInLine
    },
    {
      // 7: Last in the line (that isn't a winning move)
      lineMoveFinder: lastInLine,
      args: Player.AI
    }
  ];

  /**
   * This details the preferred order to make a move for the Medium difficulty level.
   * At this level, it should perform sub-optimally, but not deliberately lose.
   * That means that if it's possible to win or block a win, it will do so.
   * Otherwise, just play randomly, which is by nature going to be suboptimal.
   * @type {MoveFinder[]}
   */
  public static MEDIUM_PREFERRED_MOVES: MoveFinder[] = [
    { // 1: A winning move for the AI
      lineMoveFinder: winningMove,
      args: [Player.AI]
    },
    { // 2: Block a winning move for the user
      lineMoveFinder: winningMove,
      args: [Player.User]
    },
    { // 3: Just randomly choose a valid move
      boardMoveFinder: randomSquare
    }
  ];

  /**
   * Get the most optimal move available on the board
   * @param {Board} board
   * @returns {Move}
   */
  public static getHardMove(board: Board): Move {
    return MoveUtil.getFirstPossibleMove(board, ...AI.HARD_PREFERRED_MOVES);
  }

  /**
   * Get a sub-optimal move that doesn't lose on purpose
   * @param {Board} board
   * @returns {Move}
   */
  public static getMediumMove(board: Board): Move {
    return MoveUtil.getFirstPossibleMove(board, ...AI.MEDIUM_PREFERRED_MOVES);
  }

  /**
   * Get the worst possible move available
   *
   * Unlike with the Hard & Medium levels, we can't just start at the top
   * and work our way down. The easy level is more like a blacklist than a whitelist:
   * which moves do we most *not* want to do. If we simply reverse the order of the
   * Hard difficulty, there's a good chance we'll pick an optimal move by accident.
   * For example, the last hard preferred move is to be the first in the line. It's theoretically
   * possible to be the first in a line, but win or block a win on an intersecting line.
   * This is because in the Hard order, each following step precludes the previous one. By definition
   * in the hard order, if we reach #2 (block an opponent), there are no winning moves for us.
   * We do not have the same certainty if we reverse the order.
   *
   * So to get around this problem, we will create blacklists of the two types of moves we should always
   * avoid: winning moves and blocking moves. We'll randomly pick any move that doesn't fall into
   * either of those categories, unless there aren't any, in which case we'll pick first a blocking move
   * and then a winning move.
   * @type {MoveFinder[]}
   */
  public static getEasyMove(board: Board): Move {
    const winningMoves = [];
    const blockingMoves = [];
    const otherPossibleMoves = [];

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const move = { row, column };
        if (TicTacToeUtil.isValidMove(board, move)) {
          if (TicTacToeUtil.isWinningMove(move, board, Player.AI)) {
            winningMoves.push(move);
          } else if (TicTacToeUtil.isWinningMove(move, board, Player.User)) {
            blockingMoves.push(move);
          } else {
            otherPossibleMoves.push(move);
          }
        }
      }
    }

    if (otherPossibleMoves.length > 0) {
      return RandomUtil.chooseRandomElement(otherPossibleMoves);
    }

    if (blockingMoves.length > 0) {
      return RandomUtil.chooseRandomElement(blockingMoves);
    }

    if (winningMoves.length > 0) {
      return RandomUtil.chooseRandomElement(winningMoves);
    }

    throw new createError.InternalServerError(MoveUtil.NO_MOVE_FOUND);
  }
}