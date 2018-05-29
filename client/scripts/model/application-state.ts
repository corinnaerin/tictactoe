import Board from '../../../common/board';
import { Difficulty, Move, Player } from '../../../common/types';
import { Message } from './message';

export type View = 'Welcome' | 'GameConfig' | 'GameBoard';

/**
 * The redux state for the application
 */
export default interface ApplicationState {
  /**
   * Whether or not a game in currently in progress
   */
  gameInProgress: boolean;

  /**
   * Which player should go first
   */
  firstPlayer: Player;

  /**
   * Which player's turn is it?
   */
  turn?: Player;

  /**
   * What's the last move that was played
   */
  lastMove?: Move;

  /**
   * The actual tic-tac-toe board's state
   */
  board: Board;

  /**
   * The difficulty level of the AI
   */
  difficulty: Difficulty;

  /**
   * The winner of the current game
   */
  winner: Player;

  /**
   * Whether an API request is currently in progress
   */
  isFetching: boolean;

  /**
   * An application-wide message to be displayed at the top of the page
   */
  message?: Message;

  /**
   * The icon the user has chosen
   */
  userIcon: string;

  /**
   * The current view
   */
  view: View;
}