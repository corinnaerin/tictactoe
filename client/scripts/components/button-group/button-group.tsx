import * as React from 'react';

const styles = require('./button-group.css');

/**
 * A component to display & style a group of buttons. It supports
 * only standard HTML attributes as props
 * @param {React.HTMLAttributes<HTMLElement>} props
 * @returns {JSX.Element}
 */
const ButtonGroup: React.StatelessComponent<React.HTMLAttributes<HTMLElement>> = (props: React.HTMLAttributes<HTMLElement>): JSX.Element => {
  const className = props.className ? props.className + ' ' + styles.buttons : styles.buttons;
  return (
      <section {...props} className={className} >
        {props.children}
      </section>
  );
};

export default ButtonGroup;
