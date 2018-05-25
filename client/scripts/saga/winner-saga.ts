import WinnerAPI from '../api/winner-api';
import AsyncSaga from './async-saga';

const winnerSaga: AsyncSaga = new AsyncSaga(
    'GET_WINNER_REQUEST',
    'GET_WINNER_SUCCESS',
    'GET_WINNER_FAILURE',
    WinnerAPI.getWinner
);

export default winnerSaga;
