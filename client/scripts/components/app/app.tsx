import * as React from 'react';
import ApplicationMessage from '../application-message/application-message';
import Welcome from '../welcome/welcome';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const styles = require('./app.css');

const lightMuiTheme: any = getMuiTheme(lightBaseTheme);

const app: React.StatelessComponent = (): React.ReactElement<any> => {
  return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <React.Fragment>
          <ApplicationMessage/>
          <section id={styles.bodyContent}>
            <Welcome/>
          </section>
        </React.Fragment>
      </MuiThemeProvider>
  );
};

export default app;