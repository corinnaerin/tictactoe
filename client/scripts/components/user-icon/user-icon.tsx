import * as React from 'react';
import { connect } from 'react-redux';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import { RadioButton } from 'material-ui';
import { Difficulty } from '../../../../common/types';
import * as Redux from 'redux';

interface StateProps {
  difficulty: Difficulty;
}

interface DispatchProps {
  onChange: (e: React.FormEvent<{}>, selected: string) => void;
}

interface Props extends StateProps, DispatchProps {}

const difficulty: React.StatelessComponent<Props> = (props) => {
  return (
      <RadioButtonGroup name='difficulty' defaultSelected={props.difficulty} onChange={props.onChange}>
        <RadioButton
            value={Difficulty.Easy}
            label='Ron (Easy)'
        />
        <RadioButton
            value={Difficulty.Medium}
            label='Harry (Medium)'
        />
        <RadioButton
            value={Difficulty.Hard}
            label='Hermione (Hard)'
        />
      </RadioButtonGroup>
  );
};

const mapStateToProps = (store) => {
  return {
    difficulty: store.difficulty
  };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => {
  return {
    onChange: (e: React.FormEvent<{}>, selected: string) => {
      dispatch({
        type: 'SET_DIFFICULTY',
        data: selected
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(difficulty);