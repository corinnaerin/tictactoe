import Action from '../model/action';
import ApplicationState from '../model/application-state';
import { Difficulty, Player } from '../../../common/types';
import BoardUtil from '../../../common/board-util';

type ActionHandler = (state: ApplicationState, action: Action) => ApplicationState;

export const INITIAL_STATE: ApplicationState = {
  gameInProgress: false,
  board: BoardUtil.EMPTY_BOARD,
  firstPlayer: Player.User,
  difficulty: Difficulty.Easy,
  winner: Player.None,
  isFetching: false
};

const getWinnerSuccess: ActionHandler = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    gameInProgress: action.data === Player.None,
    winner: action.data
  };
};

const getMoveSuccess: ActionHandler = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    gameInProgress: action.data.winner === Player.None,
    board: BoardUtil.makeMoveImmutable(state.board, action.data.move, Player.AI)
  };
};

const userMove: ActionHandler = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    board: BoardUtil.makeMoveImmutable(state.board, action.data, Player.User)
  };
};

const setDifficulty: ActionHandler = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    difficulty: action.data
  };
};

const startGame: ActionHandler = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    gameInProgress: true
  };
};

const requestStart: ActionHandler = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    isFetching: true
  };
};

const requestSuccess: ActionHandler = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    isFetching: true
  };
};

const requestFailure: ActionHandler = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    isFetching: false,
    message: {
      type: 'error',
      message: action.error
    }
  };
};

const clearMessage: ActionHandler = (state: ApplicationState, action: Action): ApplicationState => {
  return {
    ...state,
    message: null
  };
};

const ACTION_HANDLERS: Map<string, ActionHandler[]> = new Map<string, ActionHandler[]>([
  ['GET_MOVE_REQUEST', [requestStart]],
  ['GET_MOVE_SUCCESS', [requestSuccess, getMoveSuccess]],
  ['GET_MOVE_FAILURE', [requestFailure]],
  ['GET_WINNER_REQUEST', [requestStart]],
  ['GET_WINNER_SUCCESS', [requestSuccess, getWinnerSuccess]],
  ['GET_WINNER_FAILURE', [requestFailure]],
  ['MAKE_USER_MOVE', [userMove]],
  ['SET_DIFFICULTY', [setDifficulty]],
  ['START_GAME', [startGame]],
  ['CLEAR_MESSAGE', [clearMessage]]
]);

export const reducer = (state: ApplicationState = INITIAL_STATE, action: Action): ApplicationState => {
  const actionHandlers = ACTION_HANDLERS.get(action.type);

  if (Array.isArray(actionHandlers)) {
    return actionHandlers
        .map(actionHandler => actionHandler(state, action))
        .reduce((prevState, currentState) => {
          return {
            ...prevState,
            ...currentState
          };
        });
  }

  return state;
};