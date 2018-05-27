import * as React from 'react';
import RenderIf from '../render-if/render-if';

const styles = require('./radio-button-group.css');

/**
 * A single radio button configuration
 */
export interface RadioGroupOption {
  /**
   * The 'value' attribute for the input
   */
  value: any;

  /**
   * (Optional) the text to display next to the radio button.
   * Defaults to the value if not specified
   */
  text?: string;

  /**
   * (Optional) the secondary text to display next to the
   * primary text
   */
  secondaryText?: string;
}

interface Props {
  /**
   * The label/text to display above the radio buttons
   */
  groupLabel;

  /**
   * The value of the selected radio button
   */
  selectedValue;

  /**
   * The HTML 'name' attribute
   */
  name: string;

  /**
   * The radio options to display
   */
  options: RadioGroupOption[];

  /**
   * The event handler for when the selected radio button changes
   */
  onChange: React.FormEventHandler<HTMLInputElement>;

  /**
   * Whether to disable all the radio buttons
   */
  disabled?: boolean;
}

/**
 * A component to handle a group of radio buttons
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RadioButtonGroup: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
  return (
      <section className={styles.group}>
        <div className={styles.groupLabel}>{props.groupLabel}</div>
        {props.options.map(option => {
          return (
              <div key={`${props.name}__${option.value}`}>
                <label className={styles.label}>
                  <input
                      type='radio'
                      name={props.name}
                      value={option.value}
                      checked={option.value === props.selectedValue}
                      disabled={props.disabled}
                      onChange={props.onChange}
                  />
                  &nbsp;{option.text || option.value}
                  <RenderIf condition={!!option.secondaryText}>
                    <span className={styles.secondary}>({option.secondaryText})</span>
                  </RenderIf>
                </label>
              </div>
          );
        })}
      </section>
  );
};

export default RadioButtonGroup;