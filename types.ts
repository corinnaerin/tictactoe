export enum Player {
  User = 1,
  AI = 2,
  None = -1,
  Tie = 0
}

export type Board = number[][];

export interface Winner {
  winner: Player;
}