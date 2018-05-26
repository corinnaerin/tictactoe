import * as React from 'react';
import { connect } from 'react-redux';
import { Message } from '../../model/message';
import ApplicationState from '../../model/application-state';
import * as Redux from 'redux';

const styles = require('./application-message.css');

interface StateProps {
  message: Message;
}

interface DispatchProps {
  dismiss: React.MouseEventHandler<HTMLElement>;
}

interface Props extends StateProps, DispatchProps {}

const applicationMessage: React.StatelessComponent<Props> = (props: Props) => {
  const hasMessage = !!props.message && !!props.message.message;
  const classes = [
    styles.message,
    styles[props.message.type]
  ];
  if (!hasMessage) {
    classes.push(styles.hide);
  }

  return (
      <section className={classes.join(' ')}>
        <i className={'material-icons ' + styles.icon}>{props.message.type}</i>
        <span>{props.message && props.message.message}</span>
        <i className={'material-icons ' + styles.dismiss} onClick={props.dismiss}>clear</i>
      </section>
  );
};

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => {
  return {
    dismiss: (e: React.MouseEvent<HTMLElement>) => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      });
    }
  };
};

const mapStateToProps = (store: ApplicationState) => {
  return {
    message: store.message || {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(applicationMessage);
