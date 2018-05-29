import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import RadioButtonGroup, { RadioGroupOption } from '../radio-button-group/radio-button-group';

interface StateProps {
  /**
   * The currently selected user icon
   */
  userIcon: string;

  /**
   * Whether a game is currently in progress (so we can
   * disable the radio buttons if it is)
   */
  gameInProgress: boolean;
}

interface DispatchProps {
  /**
   * The change handler for when the radio buttons change,
   * which will trigger a state update
   */
  onChange: React.FormEventHandler<HTMLInputElement>;
}

interface Props extends StateProps, DispatchProps {
}

/**
 * The possible icons for the user to choose from
 * @type {RadioGroupOption[]}
 */
const iconOptions: RadioGroupOption[] = [
  {
    value: '\uD83D\uDC79', // Monster
    subtitle: 'Monster'
  },
  {
    value: '\uD83D\uDC7E', // Alien
    subtitle: 'Alien'
  },
  {
    value: '\uD83E\uDD16', // Robot
    subtitle: 'Robot'
  },
  {
    value: '\uD83E\uDD8B', // Butterfly
    subtitle: 'Butterfly'
  },
  {
    value: '\uD83D\uDC09 ', // Dragon
    subtitle: 'Dragon'
  },
  {
    value: '\uD83D\uDC7B', // Ghost
    subtitle: 'Ghost'
  }
];

/**
 * A component to display a RadioButtonGroup for the user to select
 * their character icon
 * @param {Props} props
 * @returns {JSX.Element}
 */
const UserIconSelector: React.StatelessComponent<Props> = ({ userIcon, gameInProgress, onChange }): JSX.Element => {
  return (
      <RadioButtonGroup
          groupLabel='Choose Your Character'
          selectedValue={userIcon || iconOptions[0].value}
          name='userIcon'
          disabled={gameInProgress}
          options={iconOptions}
          onChange={onChange}
      />
  );
};

const mapStateToProps = ({ userIcon, gameInProgress }) => {
  return { userIcon, gameInProgress };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => {
  return {
    onChange: (e: React.FormEvent<HTMLInputElement>) => {
      dispatch({
        type: 'SET_USER_ICON',
        data: e.currentTarget.value
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIconSelector);