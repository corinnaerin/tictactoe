import Board from './board';

export enum Player {
  User = 1,
  AI = 2,
  None = -1,
  Tie = 0
}

export interface Winner {
  winner: Player;
}

export interface Move {
  row: number;
  column: number;
}

export type Line = Player[];

export type LineMoveFinder = (line: Line, ...args) => number;

export type BoardMoveFinder = (board: Board, ...args) => Move;

export interface MoveFinder {
  lineMoveFinder?: LineMoveFinder;
  boardMoveFinder?: BoardMoveFinder;
  args?: any;
}

export enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2
}

export type TicTacToeRequest = Line[];

export interface MoveAPIResponse {
  move: Move;
  winner: Player;
}

export interface WinnerAPIResponse {
  winner: Player;
}