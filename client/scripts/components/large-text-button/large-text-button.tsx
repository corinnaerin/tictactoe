import * as React from 'react';

const styles = require('./large-text-button.css');

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The text to display in the button
   */
  text: string;
}

/**
 * A simple button component bundled with some styles. It accepts all
 * standard HTML attributes as well as the text to display in the button
 * @param {Props} props
 * @returns {JSX.Element}
 */
const LargeTextButton: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
  const className = props.className ? `${props.className} ${styles.button}` : styles.button;
  return (
      <button {...props} className={className} >
        {props.text}
      </button>
  );
};

export default LargeTextButton;
