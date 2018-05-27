import * as React from 'react';

const styles = require('./paper.css');

/**
 * A standard Paper element that serves as a wrapper for other content. It accepts
 * all standard HTML attributes
 * @param {React.HTMLAttributes<HTMLElement>} props
 * @returns {JSX.Element}
 */
const Paper: React.StatelessComponent<React.HTMLAttributes<HTMLElement>> = (props: React.HTMLAttributes<HTMLElement>): JSX.Element => {
  const className = props.className ? props.className + ' ' + styles.paper : styles.paper;
  return (
      <section {...props} className={className}>
        {props.children}
      </section>
  );
};

export default Paper;