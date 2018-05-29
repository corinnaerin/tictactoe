import Action from '../model/action';
import ApplicationState from '../model/application-state';
import { Difficulty, Player } from '../../../common/types';
import BoardUtil from '../../../common/board-util';
import * as Redux from 'redux';

export const INITIAL_STATE: ApplicationState = {
  gameInProgress: false,
  board: BoardUtil.EMPTY_BOARD,
  firstPlayer: Player.User,
  difficulty: Difficulty.Easy,
  winner: Player.None,
  isFetching: false,
  view: 'Welcome',
  userIcon: '\uD83D\uDC79'
};

const getWinnerSuccess: Redux.Reducer<ApplicationState> = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    gameInProgress: action.data.winner === Player.None,
    winner: action.data.winner,
    board: action.input.board,
    turn: Player.AI,
    lastMove: action.input.move,
    isFetching: false
  };
};

const getMoveSuccess: Redux.Reducer<ApplicationState> = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    gameInProgress: action.data.winner === Player.None,
    turn: Player.User,
    lastMove: action.data.move,
    winner: action.data.winner,
    board: BoardUtil.makeMoveImmutable(state.board, action.data.move, Player.AI),
    isFetching: false
  };
};

const setDifficulty: Redux.Reducer<ApplicationState> = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    difficulty: action.data
  };
};

const startGame: Redux.Reducer<ApplicationState> = (state: ApplicationState): ApplicationState => {
  return {
    ...state,
    view: 'GameBoard',
    gameInProgress: true,
    lastMove: null,
    board: BoardUtil.EMPTY_BOARD,
    turn: state.firstPlayer,
    winner: Player.None
  };
};

const requestStart: Redux.Reducer<ApplicationState> = (state: ApplicationState): ApplicationState => {
  return {
    ...state,
    isFetching: true
  };
};

const requestFailure: Redux.Reducer<ApplicationState> = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    isFetching: false,
    message: {
      type: 'error',
      message: action.error
    }
  };
};

const clearMessage: Redux.Reducer<ApplicationState> = (state: ApplicationState): ApplicationState => {
  return {
    ...state,
    message: null
  };
};

const setMessage: Redux.Reducer<ApplicationState> = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    message: action.data
  };
};

const setUserIcon: Redux.Reducer<ApplicationState> = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    userIcon: action.data
  };
};

interface ReducerMap {
  [actionType: string]: Redux.Reducer<ApplicationState>;
}

const reducers: ReducerMap = {
  GET_MOVE_REQUEST: requestStart,
  GET_MOVE_SUCCESS: getMoveSuccess,
  GET_MOVE_FAILURE: requestFailure,
  GET_WINNER_REQUEST: requestStart,
  GET_WINNER_SUCCESS: getWinnerSuccess,
  GET_WINNER_FAILURE: requestFailure,
  SET_DIFFICULTY: setDifficulty,
  START_GAME: startGame,
  CLEAR_MESSAGE: clearMessage,
  SET_MESSAGE: setMessage,
  SET_USER_ICON: setUserIcon
};

export const universalReducer: Redux.Reducer<ApplicationState> = (state: ApplicationState = INITIAL_STATE, action: Action): ApplicationState => {
  const matchingReducer = reducers[action.type];

  if (typeof matchingReducer === 'function') {
    return matchingReducer(state, action);
  }

  if (action.type !== '@@INIT') {
    console.warn(`No reducer registered for action type ${action.type}`);
  }
  return state;
};