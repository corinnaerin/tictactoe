import * as React from 'react';
import ComponentUtil from '../component-util';

const styles = require('./paper.css');

/**
 * A standard Paper element that serves as a wrapper for other content. It accepts
 * all standard HTML attributes
 * @param {string} className
 * @param {React.HTMLAttributes<HTMLElement>} props
 * @returns {JSX.Element}
 */
const Paper: React.StatelessComponent<React.HTMLAttributes<HTMLElement>> = ({className, ...props }): JSX.Element => {
  return (
      <section {...props} className={ComponentUtil.getCSSClassString(className, styles.paper)}>
        {props.children}
      </section>
  );
};

export default Paper;