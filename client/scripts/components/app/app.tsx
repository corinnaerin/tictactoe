import * as React from 'react';
import ApplicationMessage from '../application-message/application-message';
import Welcome from '../welcome/welcome';
import GameConfig from '../game-config/game-config';
import GameDisplay from '../game-display/game-display';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const styles = require('./app.css');

/**
 * The root React component
 * @returns {JSX.Element}
 */
const App: React.StatelessComponent<{}> = (): JSX.Element => {
  return (
      <React.Fragment>
        <ApplicationMessage/>
        <section className={styles.bodyContent}>
          <Router>
            <React.Fragment>
              <Route exact={true} path='/' component={Welcome}/>
              <Route path='/gameconfig' component={GameConfig}/>
              <Route path='/gamedisplay' component={GameDisplay}/>
            </React.Fragment>
          </Router>
        </section>
      </React.Fragment>
  );
};

export default App;