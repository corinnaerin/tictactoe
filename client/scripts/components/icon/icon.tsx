import * as React from 'react';
import ComponentUtil from '../component-util';

interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * The name of the icon, from https://material.io/tools/icons/?style=baseline
   */
  iconName: string;
}

/**
 * Just a shortcut for using one of the Material icons
 * See https://material.io/tools/icons/?style=baseline for a
 * list of possible values for iconName
 * @param {string} iconName
 * @param {string} className
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Icon: React.StatelessComponent<Props> = ({iconName, className, ...props}): JSX.Element => {
  return <i {...props} className={ComponentUtil.getCSSClassString(iconName, className, 'material-icons')}>{iconName}</i>;
};

export default Icon;