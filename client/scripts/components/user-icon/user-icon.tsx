import * as React from 'react';
import { connect } from 'react-redux';
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
      <section>
        <label>
          <input type='radio' value={Difficulty.Easy} />
          Ron (Easy)
        </label>
        <label>
          <input type='radio' value={Difficulty.Medium} />
          Ron (Easy)
        </label>
        <label>
          <input type='radio' value={Difficulty.Hard} />
          Ron (Easy)
        </label>
      </section>
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