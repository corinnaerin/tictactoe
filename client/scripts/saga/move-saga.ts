import MoveAPI from '../api/move-api';
import AsyncSaga from './async-saga';

const moveSaga: AsyncSaga = new AsyncSaga(
    'GET_MOVE_REQUEST',
    'GET_MOVE_SUCCESS',
    'GET_MOVE_FAILURE',
    MoveAPI.getMove
);

export default moveSaga;
