import * as React from 'react';
import { Player } from '../../../../common/types';
import { connect } from 'react-redux';
import RenderIf from '../render-if/render-if';
import Paper from '../paper/paper';
import GameBoard from '../game-board/game-board';

const styles = require('./game-display.css');

interface Props {
  /**
   * Whether a game is currently in progress
   */
  gameInProgress: boolean;

  /**
   * Whether to show this component
   */
  showGameBoard: boolean;

  /**
   * The current winner of the game (which would be Player.None if the game
   * is in progress
   */
  winner: Player;

  /**
   * The player whose turn it is
   */
  turn: Player;
}

/**
 * Helper function to get the text to display at the top of the game display,
 * based on the current state
 * @param {any} turn The player whose turn it is
 * @param {any} winner The winner of the game (which could be Player.None)
 * @param {any} gameInProgress Whether the game is in progress
 * @returns {string}
 */
const getText = ({turn, winner, gameInProgress}): string => {
  if (gameInProgress) {
    return turn === Player.User ? 'It\'s your turn!' : 'Waiting for the AI to move...';
  }

  switch (winner) {
    case Player.AI:
      return 'You have been bested. Prepare to die!';
    case Player.User:
      return 'You have triumphed over the machine!';
    case Player.Tie:
      return 'Stalemate... I suppose we\'ll spare your life. Just this once..';
    case Player.None:
      return '';
  }
};

/**
 * A component to display the game header and game board
 * @param {props} Props
 * @returns {JSX.Element}
 */
const GameDisplay: React.StatelessComponent<Props> = ({gameInProgress, showGameBoard, winner, turn}): JSX.Element => {
  return (
      <RenderIf condition={showGameBoard}>
        <Paper className={styles.gameDisplay}>
          <div>{getText({turn, winner, gameInProgress})}</div>
          <GameBoard/>
        </Paper>
      </RenderIf>
  );
};

const mapStateToProps = ({ gameInProgress, turn, winner, showGameBoard }): Props => {
  return { gameInProgress, turn, winner, showGameBoard };
};

export default connect(mapStateToProps)(GameDisplay);