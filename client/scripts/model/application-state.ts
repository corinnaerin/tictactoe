import Board from '../../../common/board';
import { Difficulty, Player } from '../../../common/types';
import { Message } from './message';

export default interface ApplicationState {
  gameInProgress: boolean;
  firstPlayer: Player;
  board: Board;
  difficulty: Difficulty;
  winner: Player;
  isFetching: boolean;
  message?: Message;
}