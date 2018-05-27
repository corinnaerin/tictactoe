import WinnerAPI, { ClientWinnerAPIRequest } from '../api/winner-api';
import AsyncSaga from './async-saga';
import { WinnerAPIResponse } from '../../../common/types';

const winnerSaga: AsyncSaga<ClientWinnerAPIRequest, WinnerAPIResponse> = new AsyncSaga(
    'GET_WINNER_REQUEST',
    'GET_WINNER_SUCCESS',
    'GET_WINNER_FAILURE',
    WinnerAPI.getWinner
);

export default winnerSaga;
