import { Move, Player } from './types';
import Board from './board';

/**
 * A util class for dealing with an immutable board object
 */
export default class BoardUtil {

  /**
   * Just an empty board, with no moves played
   * @type {Board}
   */
  public static EMPTY_BOARD = new Board([
    [ Player.None, Player.None, Player.None ],
    [ Player.None, Player.None, Player.None ],
    [ Player.None, Player.None, Player.None ]
  ]);

  /**
   * Deep clone the given board
   * @param {Board} board
   * @returns {Board}
   */
  public static cloneBoard(board: Board) {
    const originalRows = board.getRows();
    const clonedRows = [
      [ ...originalRows[0] ],
      [ ...originalRows[1] ],
      [ ...originalRows[2] ]
    ];
    return new Board(clonedRows);
  }

  /**
   * Deep clone the given board and then make the given move
   * @param {Board} board the current board
   * @param {Move} move the move to make
   * @param {Player} player the player to make the move for
   * @returns {Board} the new board
   */
  public static makeMoveImmutable(board: Board, move: Move, player: Player): Board {
    const clonedBoard = BoardUtil.cloneBoard(board);
    clonedBoard.set(move, player);
    return clonedBoard;
  }
}