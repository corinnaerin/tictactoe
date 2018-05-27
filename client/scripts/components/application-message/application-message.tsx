import * as React from 'react';
import { connect } from 'react-redux';
import { Message } from '../../model/message';
import * as Redux from 'redux';

const styles = require('./application-message.css');

interface StateProps {
  /**
   * The message to display
   */
  message: Message;
}

interface DispatchProps {
  /**
   * The click handler to dismiss the message
   */
  dismiss: React.MouseEventHandler<HTMLElement>;
}

interface Props extends StateProps, DispatchProps {}

/**
 * A component to display an application-wide message
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ApplicationMessage: React.StatelessComponent<Props> = ({ message, dismiss }): JSX.Element => {
  const hasMessage = !!message && !!message.message;
  const type = message.type || 'info';
  const classes = [
    styles.message,
    styles[type]
  ];
  if (!hasMessage) {
    classes.push(styles.hide);
  }

  return (
      <section className={classes.join(' ')}>
        <i className={'material-icons ' + styles.icon}>{type}</i>
        <span>{message && message.message}</span>
        <i className={'material-icons ' + styles.dismiss} onClick={dismiss}>clear</i>
      </section>
  );
};

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => {
  return {
    dismiss: () => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      });
    }
  };
};

const mapStateToProps = ({message}): StateProps => {
  return message ? { message } : { message: {} };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationMessage);
