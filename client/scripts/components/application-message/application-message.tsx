import * as React from 'react';
import { connect } from 'react-redux';
import { Message } from '../../model/message';
import Snackbar from 'material-ui/Snackbar';
import ApplicationState from '../../model/application-state';

const styles = require('./application-message.css');

interface Props {
  message: Message;
}

const applicationMessage: React.StatelessComponent<Props> = (props: Props) => {
  return (
      <Snackbar
          open={!!props.message.message}
          message={props.message.message || ''}
          className={styles[props.message.type]}
      />
  );
};

const mapStateToProps = (store: ApplicationState) => {
  return {
    message: store.message || {}
  };
};

export default connect(mapStateToProps)(applicationMessage);
