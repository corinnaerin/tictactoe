import * as React from 'react';
import ApplicationMessage from '../application-message/application-message';
import Welcome from '../welcome/welcome';
import GameConfig from '../game-config/game-config';
import GameDisplay from '../game-display/game-display';

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
          <Welcome/>
          <GameConfig />
          <GameDisplay />
        </section>
      </React.Fragment>
  );
};

export default App;