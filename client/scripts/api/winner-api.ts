import ApiUtil from './api-util';
import { WinnerAPIResponse } from '../../../common/types';

export const HOSTNAME = '/api/winner';

export default class WinnerAPI {
  public static async getWinner(): Promise<WinnerAPIResponse> {
    return ApiUtil.get(HOSTNAME);
  }
}
