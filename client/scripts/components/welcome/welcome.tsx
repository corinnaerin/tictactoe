import * as React from 'react';
import Paper from 'material-ui/Paper';

const styles = require('./welcome.css');

const welcome: React.StatelessComponent = () => {
  return (
      <Paper className={styles.paper} style={{backgroundColor: '#eee'}} zDepth={4}>
        <h1>Enter the dungeon if you dare...</h1>
        <section>
          The risks are great but the rewards are also. The fabled key to immortality
          is hidden inside these walls. To reach your goal, you must defeat its protectors,
          who are both skilled and determined to protect it at all costs. Fail, and you
          will never see the light of day again. Succeed, and the sun will never set
          on your time on earth.
        </section>
      </Paper>
  );
};

export default welcome;
