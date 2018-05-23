import { Line, Move, Player } from './types';

/**
 * A class that represents a standard 3x3 tic-tac-toe board
 * and its current status. It is a data object only, no business logic
 */
export default class Board {

  /**
   * 2-dimensional array representing the current state of the board
   * It's private & readonly. Use #makeMove to update the state of the board
   */
  private readonly board: Line[];

  constructor(board: any) {
    if (!Array.isArray(board) ||
        board.length !== 3 ||
        !board.every(row => {
          return Array.isArray(row) &&
              row.length === 3 &&
              row.every(square => {
                return square === Player.None || square === Player.User || square === Player.AI;
              });
        })
    ) {
      throw new Error('Invalid board: must be a 3x3 2-dimensional array containing only -1, 1, or 2');
    }

    this.board = board;
  }

  /**
   * Update the board with the given move for the given player
   * @param {Move} move
   * @param {Player} player
   */
  public set(move: Move, player: Player) {
    this.board[move.row][move.column] = player;
  }

  /**
   * Get the current value of the square at the given
   * move
   * @param {Move} move
   * @returns {Player}
   */
  public get(move: Move): Player {
    return this.board[move.row][move.column];
  }

  /**
   * Shortcut method to get the board status, organized by columns
   * @returns {number[][]}
   */
  public getRows(): Line[] {
    return this.board;
  }

  /**
   * Shortcut method to get the board status, organized by columns
   */
  public getColumns(): Line[] {
    const columns = [[], [], []];
    this.board.forEach((row) => {
      columns[0].push(row[0]);
      columns[1].push(row[1]);
      columns[2].push(row[2]);
    });
    return columns;
  }

  /**
   * Returns the diagonal that starts at the top left corner
   * @returns {number[]}
   */
  public getDiagonal1(): Line {
    return this.board.map((row, index) => {
      return row[index];
    });
  }

  /**
   * Returns the diagonal that starts at the top right corner
   * @returns {number[]}
   */
  public getDiagonal2(): Line {
    return this.board.map((row, index) => {
      return row[2 - index];
    });
  }

  /**
   * Get all of the possible lines in the board
   * @returns {Line[]}
   */
  public getAllLines(): Line[] {
    return [
      this.getDiagonal1(),
      this.getDiagonal2(),
      ...this.getRows(),
      ...this.getColumns()
    ];
  }
}