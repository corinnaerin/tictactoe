import { Line, LineMoveFinder, Player } from '../../common/types';
import TicTacToeUtil from '../util/tic-tac-toe-util';
import RandomUtil from '../util/random-util';

/**
 * These are move finders that search each individual line (a row, column, or diagonal)
 * for a move
 */

/**
 * Returns the index in the line that will allow the given player to complete it (and win)
 * or -1 if it can't
 * @param {number[]} line
 * @param {Player.AI | Player.User} player
 * @returns {number}
 */
export const winningMove: LineMoveFinder = (line: Line, player: Player.AI | Player.User): number => {
  // If the given player already has 2 squares claimed, claim the third (if it's empty)
  if (TicTacToeUtil.getNumberSquaresClaimed(line, player) === 2) {
    return line.indexOf(Player.None);
  }

  return -1;
};

/**
 * Returns an index in the line if it has exactly one square claimed by the given player and the
 * rest empty. i.e. it's the second move in the line, or -1 if the line doesn't qualify
 * @param {Line} line
 * @param {Player.AI | Player.User} player
 * @returns {number}
 */
export const secondInLine: LineMoveFinder = (line: Line, player: Player.AI | Player.User): number => {
  if (TicTacToeUtil.getNumberSquaresClaimed(line, player) === 1 &&
      !TicTacToeUtil.checkForOpponent(line, player)) {
    if (line[1] === player) {
      // The middle of the line has been claimed. Randomly choose between the left and the right
      return RandomUtil.getRandomBool() ? 0 : 2;
    } else {
      // If it's either the right or left, always pick the middle so as to be adjacent to our first move
      return 1;
    }
  }

  return -1;
};

/**
 * Returns a random index if the line is empty, or -1 if the line isn't empty
 * @param {Line} line
 * @returns {number}
 */
export const firstInLine: LineMoveFinder = (line: Line): number => {
  if (TicTacToeUtil.isLineEmpty(line)) {
    return RandomUtil.getRandomInt(3);
  }

  return -1;
};

/**
 * Returns the index of the last open square in the line that isn't a winning move,
 * or -1 if there isn't
 * @param {Line} line
 * @param {Player} player
 * @returns {number}
 */
export const lastInLine: LineMoveFinder = (line: Line, player: Player.AI | Player.User): number => {
  if (TicTacToeUtil.getNumEmptySquares(line) === 1 &&
      TicTacToeUtil.getNumberSquaresClaimed(line, player) === 1 &&
      TicTacToeUtil.checkForOpponent(line, player)) {
    return line.indexOf(Player.None);
  }
};