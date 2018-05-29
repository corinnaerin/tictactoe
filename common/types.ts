import Board from './board';

/**
 * The possible players, including a tie and no player
 */
export enum Player {
  User = 1,
  AI = 2,
  None = -1,
  Tie = 0
}

export interface Winner {
  winner: Player;
}

/**
 * The indexes of the row & column for a single move
 */
export interface Move {
  /**
   * The row of the board
   */
  row: number;

  /**
   * The column of the board
   */
  column: number;
}

/**
 * A single line of the tic-tac-toe board
 */
export type Line = Player[];

/**
 * A function which takes in a single line and returns
 * an index in that line, used for finding a move based on
 * line-specific criteria
 */
export type LineMoveFinder = (line: Line, ...args) => number;

/**
 * A function which takes in the entire board and returns a
 * move, used for finding a move based on the state of the
 * entire board
 */
export type BoardMoveFinder = (board: Board, ...args) => Move;

/**
 * Contains either a line-based move finder or a board-move finder
 * and the args to pass to them
 */
export interface MoveFinder {
  lineMoveFinder?: LineMoveFinder;
  boardMoveFinder?: BoardMoveFinder;
  args?: any;
}

/**
 * The difficulty levels of the game
 */
export enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
  Luna = 3
}

/**
 * The format of a request to any of the APIs
 */
export type TicTacToeRequest = Line[];

/**
 * The format of a response from the /api/move/* routes
 */
export interface MoveAPIResponse {
  /**
   * The move to play
   */
  move: Move;

  /**
   * The winner after the move is made
   */
  winner: Player;
}

/**
 * The format of a response from the /api/winner route
 */
export interface WinnerAPIResponse {
  /**
   * The winner of the game
   */
  winner: Player;
}