import * as React from 'react';
import ButtonGroup from '../button-group/button-group';
import LargeTextButton from '../large-text-button/large-text-button';
import Paper from '../paper/paper';
import { connect } from 'react-redux';
import * as Redux from 'redux';

interface DispatchProps {
  /**
   * The click handler for when someone clicks on the "get me out of here" button,
   * which will trigger a state update with a message
   */
  wimpOut: React.FormEventHandler<HTMLButtonElement>;

  /**
   * The click handler for when someone clicks on the "I'm not scared" button,
   * which will trigger a state update to show the game configuration component
   */
  meSoBrave: React.FormEventHandler<HTMLButtonElement>;
}

interface StateProps {
  /**
   * Whether the game config component is visible, in which case
   * we should disable the buttons
   */
  showGameConfig: boolean;
}

interface Props extends DispatchProps, StateProps {
}

/**
 * A component with a welcome message that also presents two options to the user:
 * to wimp out or to forge forward!
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Welcome: React.StatelessComponent<Props> = ({showGameConfig, meSoBrave, wimpOut}): JSX.Element => {
  return (
      <Paper>
        <h1>Enter the dungeon if you dare...</h1>
        <section>
          The risks are great but the rewards are also. The fabled key to immortality
          is hidden inside these walls. To reach your goal, you must defeat its protectors,
          who are both skilled and determined to protect it at all costs. Fail, and you
          will never see the light of day again. Succeed, and the sun will never set
          on your time on earth.
        </section>
        <ButtonGroup>
          <LargeTextButton id='brave' text={'\uD83D\uDE08 I\'m not scared!'} onClick={meSoBrave} disabled={showGameConfig}/>
          <LargeTextButton id='wimp' text={'\uD83C\uDFC3 Ahh get me out of here!'} onClick={wimpOut} disabled={showGameConfig}/>
        </ButtonGroup>
      </Paper>
  );
};

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => {
  return {
    /**
     * The click handler for when someone clicks on the "get me out of here" button,
     * which will trigger a state update with a message
     */
    wimpOut: () => {
      dispatch({
        type: 'SET_MESSAGE',
        data: {
          message: '\u266B Brave Sir Robin ran away. Bravely ran away, away. When danger reared it\'s ugly head, he ' +
          'bravely turned his tail and fled...',
          type: 'warning'
        }
      });
    },

    /**
     * The click handler for when someone clicks on the "I'm not scared" button,
     * which will trigger a state update to show the game configuration component
     */
    meSoBrave: () => {
      dispatch({
        type: 'SET_SHOW_GAME_CONFIG',
        data: true
      });
    }
  };
};

const mapStateToProps = ({ showGameConfig }) => {
  return { showGameConfig };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
