import { Player, Board, Winner } from '../../types';
import * as log from 'fancy-log';
import { Request, Response } from 'express';

/**
 * Controller for the /api/winner route
 * Given a 3x3 tic-tac-toe board, it will return the winner
 * (if there is one) from the state of the board.
 * Player.Tie (0) = Cat's game (tie)
 * Player.User (1) = X won
 * Player.AI (2) = O won
 * Player.None (-1) = Board is incomplete
 */
export default class WinnerController {

  public static post(req: Request, res: Response): void {
    const board: Board = req.body;
    const winner = WinnerController.findWinner(board);
    res.status(200)
        .json({ winner });
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
    let winner: Player = Player.Tie;

    // This works because we've defaulted the winner to a tie, which has a
    // value of 0. Any other result, including an incomplete board (-1) is
    // truthy, and will thus override the default.
    winner = WinnerController.checkDownRightDiagonal(board) || winner;
    if (winner > 0) {
      log.info(`Player ${winner} won on the down right diagonal!`);
      return winner;
    }

    winner = WinnerController.checkDownLeftDiagonal(board) || winner;
    if (winner > 0) {
      log.info(`Player ${winner} won on the down left diagonal!`);
      return winner;
    }

    // Check rows
    for (let i = 0; i < 3; i++) {
      winner = WinnerController.checkRow(board[i]) || winner;
      if (winner > 0) {
        log.info(`Player ${winner} won on row ${i}!`);
        return winner;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      winner = WinnerController.checkColumn(board, i) || winner;
      if (winner > 0) {
        log.info(`Player ${winner} won on column ${i}!`);
        return winner;
      }
    }

    return winner;
  }

  /**
   * Check an individual row for a win
   * @param row
   * @returns {Player}
   */
  private static checkRow(row): Player {
    // We need to separately check for empty squares, since we need to be able to
    // distinguish between no winner in the row and an incomplete row
    const hasEmpty = row.findIndex(value => value === Player.None) !== -1;
    if (hasEmpty) {
      return Player.None;
    }
    const lookingFor: Player = row[0];
    if (row.every(value => value === lookingFor)) {
      return lookingFor;
    }
  }

  /**
   * Check the individual column at the specified index
   * @param board the board to check
   * @param columnIndex the index of the column to check
   * @returns {Player} the winner that was found
   */
  private static checkColumn(board, columnIndex): Player {
    // We need to separately check for empty squares, since we need to be able to
    // distinguish between no winner in the row and an incomplete row
    const hasEmpty = board.findIndex(row => row[columnIndex] === Player.None) !== -1;
    if (hasEmpty) {
      return Player.None;
    }
    const lookingFor = board[0][columnIndex];
    if (board.every(row => row[columnIndex] === lookingFor)) {
      return lookingFor;
    }
  }

  /**
   * Check the diagonal that starts at the top right corner
   * @param board the board the check
   * @returns {Player} the winner that was found
   */
  private static checkDownLeftDiagonal(board: Board): Player {
    const lookingFor = board[0][2];
    if (lookingFor === Player.None) {
      return Player.None;
    }
    if (board.every((row, index) => row[2 - index] === lookingFor)) {
      return lookingFor;
    }
  }

  /**
   * Check the diagonal that starts at the top left corner
   * @param board the board to check
   * @returns {Player} the winner that was found
   */
  private static checkDownRightDiagonal(board: Board) {
    const lookingFor: Player = board[0][0];
    if (lookingFor === Player.None) {
      return Player.None;
    }
    if (board.every((row, index) => row[index] === lookingFor)) {
      return lookingFor;
    }
  }
}