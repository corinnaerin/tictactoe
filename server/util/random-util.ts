export default class RandomUtil {
  /**
   * Return a random boolean
   * @returns {boolean}
   */
  public static getRandomBool(): boolean {
    return Math.random() < .5;
  }

  /**
   * Get a random integer between [0,max)
   * Max is exclusive
   * @param {number} max
   * @returns {number}
   */
  public static getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /**
   * Choose a random element from the array
   * @param {any[]} arr
   * @returns {any}
   */
  public static chooseRandomElement(arr: any[]) {
    if (!arr || arr.length === 0) {
      return;
    }

    // Remember that the max is exclusive, so this works!
    return arr[RandomUtil.getRandomInt(arr.length)];
  }
}