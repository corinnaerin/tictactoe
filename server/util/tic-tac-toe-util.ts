import { Line, Move, Player } from '../../common/types';
import Board from '../../common/Board';

/**
 * A Util class for useful methods generally related to dealing with the
 * tic tac toe board
 */
export default class TicTacToeUtil {
  public static PLAYER_NONE_PREDICATE = test => test === Player.None;

  /**
   * Returns the opponent of the given player
   * @param {Player.User | Player.AI} player
   * @returns {Player.User | Player.AI}
   */
  public static getOpponent(player: Player.User | Player.AI) {
    return player === Player.AI ? Player.User : Player.AI;
  }

  /**
   * Check if the given player's opponent has claimed squares in the given line
   * @param {Line} line
   * @param {Player.User | Player.AI} player
   * @returns {boolean}
   */
  public static checkForOpponent(line: Line, player: Player.User | Player.AI) {
    return line.some(square => square === TicTacToeUtil.getOpponent(player));
  }

  /**
   * Check if the given board has at least 1 empty square
   * @param {Board} board
   * @returns {boolean}
   */
  public static boardHasEmptySquares(board: Board): boolean {
    return board.getRows().some(TicTacToeUtil.lineHasEmptySquares);
  }

  /**
   * Check if the given line has at least 1 empty square
   * @param {Line} line
   * @returns {boolean}
   */
  public static lineHasEmptySquares(line: Line): boolean {
    return line.some(TicTacToeUtil.PLAYER_NONE_PREDICATE);
  }

  /**
   * Check if the given line is completely empty
   * @param {Line} line
   * @returns {boolean}
   */
  public static isLineEmpty(line: Line): boolean {
    return line.every(TicTacToeUtil.PLAYER_NONE_PREDICATE);
  }

  /**
   * Returns an array of booleans, corresponding to the
   * rows. true if the line is empty, false otherwise
   * @param {Board} board
   * @returns {boolean[]}
   */
  public static getEmptyRows(board: Board): boolean[] {
    return board.getRows().map(TicTacToeUtil.isLineEmpty);
  }

  /**
   * Returns an array of booleans, corresponding to the
   * rows. true if the line is empty, false otherwise
   * @param {Board} board
   * @returns {boolean[]}
   */
  public static getEmptyColumns(board: Board): boolean[] {
    return board.getColumns().map(TicTacToeUtil.isLineEmpty);
  }

  /**
   * Checks how many empty squares are in the line
   * @param {Line} line
   * @returns {number}
   */
  public static getNumEmptySquares(line: Line): number {
    return line.filter(TicTacToeUtil.PLAYER_NONE_PREDICATE).length;
  }

  /**
   * Returns the number of squares claimed by the given player
   * @param {Line} line
   * @param {Player} player
   * @returns {number}
   */
  public static getNumberSquaresClaimed(line: Line, player: Player) {
    return line.filter(value => value === player).length;
  }

  /**
   * Check if the given move is still available on the given board
   * @param {Board} board
   * @param {Move} move
   * @returns {boolean}
   */
  public static isValidMove(board: Board, move: Move) {
    return move && board.get(move) === Player.None;
  }

  /**
   * Check if the two given moves are the same
   * @param {Move} move1
   * @param {Move} move2
   * @returns {boolean}
   */
  public static equalMoves(move1: Move, move2: Move): boolean {
    return move1.row === move2.row && move1.column === move2.column;
  }

  /**
   * Returns the winner based on the current state of the board:
   * @param {Board} board
   * @returns {Winner}
   * Player.Tie (0) = Cat's game (tie)
   * Player.User (1) = X won
   * Player.AI (2) = O won
   * Player.None (-1) = Board is incomplete
   */
  public static findWinner(board: Board): Player {
    let hasEmptySquares = false;

    // Search all of the lines in the board for a winner
    // Unlike when searching for a move to make, we only care if there's
    // a line that matches the condition (a win!), not which line it is
    // So it simplifies this a lot because we can just check all of the lines
    // without keeping track
    const winningLine = board.getAllLines().find(line => {
      // We need to separately check for empty squares, since we need to be able to
      // distinguish between no winner in the row and an incomplete row
      if (TicTacToeUtil.lineHasEmptySquares(line)) {
        hasEmptySquares = true;
        return false;
      }

      // We've found a winner if the line is all the same value (and we've already checked that there aren't
      // empty squares
      return line.every(value => value === line[0]);
    });

    if (winningLine) {
      return winningLine[0];
    }

    return hasEmptySquares ? Player.None : Player.Tie;
  }

  /**
   * Returns true if the move wins for the given player
   * @param {Move} move
   * @param {Board} board
   * @param {Player} player
   * @returns {boolean}
   */
  public static isWinningMove(move: Move, board: Board, player: Player): boolean {
    if (!TicTacToeUtil.isValidMove(board, move)) {
      return false;
    }

    const columns = board.getColumns();
    const rows = board.getRows();

    const linesToCheck = [
      rows[move.row],
      columns[move.column]
    ];

    // If the center square or corners, we also need to check the diagonals
    if (move.row === move.column || // diagonal 1
        Math.abs(move.row - move.column) === 2) { // diagonal 2
      linesToCheck.push(board.getDiagonal1());
      linesToCheck.push(board.getDiagonal2());
    }

    for (const line of linesToCheck) {
      if (TicTacToeUtil.getNumberSquaresClaimed(line, player) === 2 &&
          TicTacToeUtil.getNumEmptySquares(line) === 1) {
        return true;
      }
    }

    return false;
  }
}