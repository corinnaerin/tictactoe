import ApiUtil from './api-util';
import { Difficulty, MoveAPIResponse } from '../../../common/types';
import Board from '../../../common/board';

/**
 * Reference map containing the route for each difficulty
 * @type {Map<Difficulty, string>}
 */
export const ROUTE_MAP: Map<Difficulty, string> = new Map([
    [ Difficulty.Hard, '/api/move/hard' ],
    [ Difficulty.Medium, '/api/move/medium' ],
    [ Difficulty.Easy, '/api/move/easy'],
    [ Difficulty.Luna, '/api/move/luna']
]);

/**
 * The input required to make a request to the Move API
 */
export interface ClientMoveAPIRequest {
  difficulty: Difficulty;
  board: Board;
}

/**
 * A class to call the various /move APIs
 */
export default class MoveAPI {
  /**
   * Get the next AI move based on the given input
   * @param {ClientMoveAPIRequest} input the current board and difficulty level
   * @returns {Promise<MoveAPIResponse>} the next move
   */
  public static async getMove(input: ClientMoveAPIRequest): Promise<MoveAPIResponse> {
    return ApiUtil.post(ROUTE_MAP.get(input.difficulty), input.board.getRows());
  }
}
