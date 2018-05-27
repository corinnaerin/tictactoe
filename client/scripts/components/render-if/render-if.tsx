import * as React from 'react';

interface Props {
  /**
   * Whether to render the children
   */
  condition: boolean;
}

/**
 * A simple but extremely useful utility component to gate content
 * based on a conditional
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RenderIf: React.StatelessComponent<Props> = (props) => {
  if (props.condition) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  return null;
};

export default RenderIf;