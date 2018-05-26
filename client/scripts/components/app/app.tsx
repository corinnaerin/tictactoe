import * as React from 'react';
import ApplicationMessage from '../application-message/application-message';
import Welcome from '../welcome/welcome';

const styles = require('./app.css');

const app: React.StatelessComponent = (): React.ReactElement<any> => {
  return (
      <React.Fragment>
        <ApplicationMessage/>
        <section id={styles.bodyContent}>
          <Welcome/>
        </section>
      </React.Fragment>
  );
};

export default app;