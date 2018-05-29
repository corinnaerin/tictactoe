export interface ComponentCSSClasses {
  [className: string]: boolean;
}

/**
 * Useful utility methods for building components
 */
export default class ComponentUtil {

  /**
   * Get a single css class string (e.g. 'class-1 class-2 class-3'
   * based on an object mapping each possible class name to a boolean.
   * This is very useful for conditionally applying classes in a component
   * @param {ComponentCSSClasses} cssClasses
   * @returns {string}
   */
  public static getConditionalCSSClassString(cssClasses: ComponentCSSClasses): string {
    return Object.keys(cssClasses)
        .filter((cssClass) => cssClasses[cssClass])
        .join(' ');
  }

  /**
   * Turn a list of css classes into a single css class string
   * @param {string[]} cssClasses
   * @returns {string}
   */
  public static getCSSClassString(...cssClasses: string[]) {
    return cssClasses.join(' ');
  }
}