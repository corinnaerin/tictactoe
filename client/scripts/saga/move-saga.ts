import MoveAPI, { ClientMoveAPIRequest } from '../api/move-api';
import AsyncSaga from './async-saga';
import { MoveAPIResponse } from '../../../common/types';

const moveSaga: AsyncSaga<ClientMoveAPIRequest, MoveAPIResponse> = new AsyncSaga(
    'GET_MOVE_REQUEST',
    'GET_MOVE_SUCCESS',
    'GET_MOVE_FAILURE',
    MoveAPI.getMove
);

export default moveSaga;
