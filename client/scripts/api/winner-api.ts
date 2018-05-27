import ApiUtil from './api-util';
import { Move, WinnerAPIResponse } from '../../../common/types';
import Board from '../../../common/board';

/**
 * The route for the winner API
 * @type {string}
 */
export const ROUTE = '/api/winner';

/**
 * The input required to make a request to the Winner API
 */
export interface ClientWinnerAPIRequest {
  board: Board;
  move: Move;
}

/**
 * A class to call the winner API
 */
export default class WinnerAPI {
  /**
   * Get the winner (if any) for the given board.
   * The move is a required input here even though it's not sent to the server,
   * because it is then passed by AsyncSaga to the success reducer to update the state
   * @param {ClientWinnerAPIRequest} input the board and current move
   * @returns {Promise<WinnerAPIResponse>} the winner of the game
   */
  public static async getWinner(input: ClientWinnerAPIRequest): Promise<WinnerAPIResponse> {
    return ApiUtil.post(ROUTE, input.board.getRows());
  }
}
