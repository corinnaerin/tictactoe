import * as React from 'react';
import { connect } from 'react-redux';
import DifficultySelector from '../difficulty-selector/difficulty-selector';
import UserIconSelector from '../user-icon-selector/user-icon-selector';
import Paper from '../paper/paper';
import RenderIf from '../render-if/render-if';
import LargeTextButton from '../large-text-button/large-text-button';
import * as Redux from 'redux';

const styles = require('./game-config.css');

interface StateProps {
  /**
   * Whether a game is in progress, so we can disable the "start game" button if it is
   */
  gameInProgress: boolean;

  /**
   * Whether to show this component
   */
  showGameConfig: boolean;
}

interface DispatchProps {
  startGame: React.FormEventHandler<HTMLButtonElement>;
}

interface Props extends StateProps, DispatchProps {
}

/**
 * A component to display all of the configuration options for a game
 * @param {Props} props
 * @returns {JSX.Element}
 */
const GameConfig: React.StatelessComponent<Props> = ({ showGameConfig, startGame, gameInProgress }): JSX.Element => {
  return (
      <RenderIf condition={showGameConfig}>
        <Paper className={styles.gameConfig}>
          <DifficultySelector/>
          <UserIconSelector/>
          <LargeTextButton
              disabled={gameInProgress}
              text={'\uD83C\uDFB2 Let the games\'s begin!'}
              onClick={startGame}
          />
        </Paper>
      </RenderIf>
  );
};

const mapStateToProps = ({ showGameConfig, gameInProgress }) => {
  return { showGameConfig, gameInProgress };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => {
  return {
    startGame: () => {
      dispatch({
        type: 'START_GAME'
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameConfig);