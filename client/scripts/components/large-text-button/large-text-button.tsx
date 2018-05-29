import * as React from 'react';
import ComponentUtil from '../component-util';
import { Link } from 'react-router-dom';
import RenderIf from '../render-if/render-if';
import Icon from '../icon/icon';

const styles = require('./large-text-button.css');

interface Props extends React.HTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
  /**
   * The text to display in the button
   */
  text: string;

  /**
   * Route to link to
   */
  route?: string;

  /**
   * Icon for the button
   */
  iconName?: string;
}

/**
 * A simple button component bundled with some styles. It accepts all
 * standard HTML attributes as well as the text to display in the button
 * @param {string} text
 * @param {string} className
 * @param {route} route
 * @param {ButtonHTMLAttributes} props
 * @returns {JSX.Element}
 * @constructor
 */
const LargeTextButton: React.StatelessComponent<Props> = ({ text, className, route, iconName, ...props }): JSX.Element => {
  const classStr = ComponentUtil.getCSSClassString(className, styles.button);
  if (route) {
    return (
        <Link {...props} to={route} className={classStr}>
          <RenderIf condition={!!iconName}>
            <Icon iconName={iconName} />
          </RenderIf>
          {text}
        </Link>);
  }

  return (
      <button {...props} className={classStr}>
        <RenderIf condition={!!iconName}>
          <Icon iconName={iconName} />
        </RenderIf>
        {text}
      </button>
  );
};

export default LargeTextButton;
