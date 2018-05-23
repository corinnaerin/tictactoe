import { Line, Move, MoveFinder } from '../../common/types';
import Board from '../../common/board';
import TicTacToeUtil from './tic-tac-toe-util';
import createError = require('http-errors');

/**
 * A Util class for executing board-based move finders and line-based move finders
 */
export default class MoveUtil {
  public static NO_EMPTY_SQUARES: string = `The board has no empty squares!`;
  public static NO_MOVE_FOUND: string = `No valid move has been found!`;

  /**
   * Go through the list of preferred moves and return
   * the first valid move found
   * @param {Board} board
   * @param {MoveFinder[]} preferredMoves
   * @returns {Move}
   */
  public static getFirstPossibleMove(board: Board, ...preferredMoves: MoveFinder[]): Move {
    if (!TicTacToeUtil.boardHasEmptySquares(board)) {
      throw new createError.BadRequest(MoveUtil.NO_EMPTY_SQUARES);
    }

    for (const possibleMove of preferredMoves) {
      const matchingMove = MoveUtil.executeMoveFinder(board, possibleMove);
      if (TicTacToeUtil.isValidMove(board, matchingMove)) {
        return matchingMove;
      }
    }

    throw new createError.InternalServerError(MoveUtil.NO_MOVE_FOUND);
  }

  /**
   * A utility method to execute either the board move finder or
   * the line move finder
   * @param {Board} board the board to check
   * @param {MoveFinder} moveFinder the movefinder to test all the lines against
   * @returns {Move} the first matching move found, or nothing
   */
  private static executeMoveFinder(board: Board, moveFinder: MoveFinder): Move {
    return moveFinder.boardMoveFinder ? MoveUtil.searchBoardForMove(board, moveFinder) : MoveUtil.searchLinesForMove(board, moveFinder);
  }

  /**
   * A generic utility method which will search the board for a move,
   * given the function that takes in a line and returns the index of a
   * move in that line that matches, if it exists. Otherwise returns nothing
   * @param {Board} board the board to check
   * @param {MoveFinder} moveFinder the movefinder to test all the lines against
   * @returns {Move} the first matching move found, or nothing
   */
  private static searchLinesForMove(board: Board, moveFinder: MoveFinder): Move {
    // Check the first diagonal (that starts at the top left corner)
    const diagonal1: Line = board.getDiagonal1();
    let matchingIndex = moveFinder.lineMoveFinder(diagonal1, ...moveFinder.args);
    if (matchingIndex !== -1) {
      // In this diagonal each square has the same row & column index
      return {
        row: matchingIndex,
        column: matchingIndex
      };
    }

    // Check the second diagonal (that starts at the top right corner)
    const diagonal2: Line = board.getDiagonal2();
    matchingIndex = moveFinder.lineMoveFinder(diagonal2, ...moveFinder.args);
    if (matchingIndex !== -1) {
      // We have to subtract to get the column index because the column indexes decrease as the row indexes increase
      return {
        row: matchingIndex,
        column: 2 - matchingIndex
      };
    }

    // Check rows
    const rows: Line[] = board.getRows();
    for (let i = 0; i < 3; i++) {
      const row: Line = rows[i];
      matchingIndex = moveFinder.lineMoveFinder(row, ...moveFinder.args);
      if (matchingIndex !== -1) {
        return {
          row: i,
          column: matchingIndex
        };
      }
    }

    // Check columns
    const columns: Line[] = board.getColumns();
    for (let i = 0; i < 3; i++) {
      const column: Line = columns[i];
      matchingIndex = moveFinder.lineMoveFinder(column, ...moveFinder.args);
      if (matchingIndex !== -1) {
        return {
          row: matchingIndex,
          column: i
        };
      }
    }

    return;
  }

  /**
   * Executes the given board-based move finder on the board
   * @param {Board} board the board to check
   * @param {MoveFinder} moveFinder the movefinder to test all the lines against
   * @returns {Move} the matching move found, or nothing
   */
  private static searchBoardForMove(board: Board, moveFinder: MoveFinder): Move {
    return moveFinder.boardMoveFinder(board, ...moveFinder.args);
  }
}