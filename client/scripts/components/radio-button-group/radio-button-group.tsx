import * as React from 'react';
import RenderIf from '../render-if/render-if';
import ComponentUtil from '../component-util';

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
   * (Optional) the secondary text to display under the
   * primary text
   */
  subtitle?: string;
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

  /**
   * CSS class to add to the <label> element
   */
  labelClass?: string;

  /**
   * CSS class to add to the <input> element
   */
  inputClass?: string;
}

/**
 * A component to handle a group of radio buttons
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RadioButtonGroup: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
  const labelClasses = {
    [styles.label]: true,
    [styles.disabled]: props.disabled,
    [props.labelClass]: true
  };
  return (
      <section className={styles.group}>
        <h3 className={styles.groupLabel}>{props.groupLabel}</h3>
        <div className={styles.inputContainer}>
          {props.options.map(option => {
            const key = `${props.name}__${option.value}`;
            return (
                <div key={`${props.name}__${option.value}`}>
                  <input
                      id={key}
                      className={ComponentUtil.getCSSClassString(styles.radio, props.inputClass)}
                      type='radio'
                      name={props.name}
                      value={option.value}
                      checked={option.value === props.selectedValue}
                      disabled={props.disabled}
                      onChange={props.onChange}
                  />
                  <label htmlFor={key} className={ComponentUtil.getConditionalCSSClassString(labelClasses)}>
                    {option.text || option.value}
                    <RenderIf condition={!!option.subtitle}>
                      <div className={styles.subtitle}>{option.subtitle}</div>
                    </RenderIf>
                  </label>
                </div>
            );
          })}
        </div>
      </section>
  );
};

export default RadioButtonGroup;