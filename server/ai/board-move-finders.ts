import { BoardMoveFinder, Move, Player } from '../../common/types';
import Board from '../../common/Board';
import RandomUtil from '../util/random-util';
import TicTacToeUtil from '../util/tic-tac-toe-util';

/**
 * A simple board move finder that checks if we can move in the middle space
 * @param {Board} board
 */
export const middleSquare: BoardMoveFinder = (board: Board): Move => {
  const middleSquareMove: Move = {
    row: 1,
    column: 1
  };
  if (TicTacToeUtil.isValidMove(board, middleSquareMove)) {
    return middleSquareMove;
  }
};

/**
 * A totally unintelligent board move finder that just randomly
 * picks one of the open squares
 * @param {Board} board
 * @returns {Move}
 */
export const randomSquare: BoardMoveFinder = (board: Board): Move => {
  const validMoves: Move[] = [];

  board.getRows().forEach((line, row) => {
    line.forEach((value, column) => {
      if (value === Player.None) {
        validMoves.push({ row, column });
      }
    });
  });

  if (validMoves.length === 0) {
    return;
  }

  return RandomUtil.chooseRandomElement(validMoves);
};

/**
 * Picks a square that is empty both in its row and column. We don't
 * check for diagonals, because that case is covered by the middleSquare
 * line finder
 * @param {Board} board
 * @returns {Move}
 */
export const emptyRowAndColumn: BoardMoveFinder = (board: Board): Move => {

  const emptyColumns = TicTacToeUtil.getEmptyColumns(board);
  const emptyRows = TicTacToeUtil.getEmptyRows(board);

  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      const move = { row, column };
      if (TicTacToeUtil.isValidMove(board, move) && emptyColumns[column] && emptyRows[row]) {
        return move;
      }
    }
  }
};