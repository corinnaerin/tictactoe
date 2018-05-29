import * as React from 'react';
import { connect } from 'react-redux';
import { Difficulty } from '../../../../common/types';
import * as Redux from 'redux';
import RadioButtonGroup, { RadioGroupOption } from '../radio-button-group/radio-button-group';
import { getAiIcon } from '../../model/ai-icons';

interface StateProps {
  /**
   * The difficulty currently selected
   */
  difficulty: Difficulty;
  /**
   * Whether a game is currently in progress
   */
  gameInProgress: boolean;
}

interface DispatchProps {
  /**
   * Event handler when the selected radio button changes,
   * which will trigger a state update with the new difficulty
   */
  onChange: React.FormEventHandler<HTMLInputElement>;
}

interface Props extends StateProps, DispatchProps {
}

/**
 * The radio button options for each difficulty level
 * @type {RadioGroupOption[]}
 */
const difficultyOptions: RadioGroupOption[] = [
  {
    value: Difficulty.Easy,
    text: getAiIcon(Difficulty.Easy),
    subtitle: 'Ron (Easy)'
  },
  {
    value: Difficulty.Medium,
    text: getAiIcon(Difficulty.Medium),
    subtitle: 'Harry (Medium)'
  },
  {
    value: Difficulty.Hard,
    text: getAiIcon(Difficulty.Hard),
    subtitle: 'Hermione (Hard)'
  },
  {
    value: Difficulty.Luna,
    text: getAiIcon(Difficulty.Luna),
    subtitle: 'Luna (???)'
  }
];

/**
 * A Component for choosing the difficulty level of the game
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DifficultySelector: React.StatelessComponent<Props> = ({ difficulty, gameInProgress, onChange }): JSX.Element => {
  return (
      <RadioButtonGroup
          groupLabel='Choose Your Opponent'
          selectedValue={difficulty}
          name='difficulty'
          disabled={gameInProgress}
          options={difficultyOptions}
          onChange={onChange}
      />
  );
};

const mapStateToProps = ({ difficulty, gameInProgress }) => {
  return { difficulty, gameInProgress };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => {
  return {
    onChange: (e: React.FormEvent<HTMLInputElement>) => {
      dispatch({
        type: 'SET_DIFFICULTY',
        data: parseInt(e.currentTarget.value, 10)
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DifficultySelector);