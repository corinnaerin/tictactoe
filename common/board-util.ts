import { Move, Player } from './types';
import Board from './board';

export default class BoardUtil {
  public static EMPTY_BOARD = new Board([
    [ Player.None, Player.None, Player.None ],
    [ Player.None, Player.None, Player.None ],
    [ Player.None, Player.None, Player.None ]
  ]);

  public static cloneBoard(board: Board) {
    const originalRows = board.getRows();
    const clonedRows = [
      [ ...originalRows[0] ],
      [ ...originalRows[1] ],
      [ ...originalRows[2] ]
    ];
    return new Board(clonedRows);
  }

  public static makeMoveImmutable(board: Board, move: Move, player: Player): Board {
    const clonedBoard = BoardUtil.cloneBoard(board);
    board.set(move, player);
    return clonedBoard;
  }
}