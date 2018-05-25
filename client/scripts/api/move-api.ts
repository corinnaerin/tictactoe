import ApiUtil from './api-util';
import { Difficulty, MoveAPIResponse } from '../../../common/types';

export const HOSTNHAME_MAP: Map<Difficulty, string> = new Map([
    [ Difficulty.Hard, '/api/move/hard' ],
    [ Difficulty.Medium, '/api/move/medium' ],
    [ Difficulty.Easy, '/api/move/easy']
]);

export default class MoveAPI {
  public static async getMove(difficulty: Difficulty): Promise<MoveAPIResponse> {
    return ApiUtil.get(HOSTNHAME_MAP.get(difficulty));
  }
}
