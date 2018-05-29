import * as React from 'react';
import ComponentUtil from '../component-util';

const styles = require('./button-group.css');

/**
 * A component to display & style a group of buttons. It supports
 * only standard HTML attributes as props
 * @param {string} className
 * @param {React.HTMLAttributes<HTMLElement>} props
 * @returns {JSX.Element}
 */
const ButtonGroup: React.StatelessComponent<React.HTMLAttributes<HTMLElement>> = ({ className, ...props}): JSX.Element => {
  return (
      <section {...props} className={ComponentUtil.getCSSClassString(className, styles.buttons)} >
        {props.children}
      </section>
  );
};

export default ButtonGroup;
