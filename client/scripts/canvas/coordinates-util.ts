import Coordinates from '../model/coordinates';
import { Move } from '../../../common/types';

/**
 * The coordinates for the upper-left corner of each square
 * of the tic-tac-toe board
 * @type {Coordinates[][]}
 */
const boardCoordinates: Coordinates[][] = [
  [{x: 100, y: 100}, {x: 200, y: 100}, {x: 300, y: 100}],
  [{x: 100, y: 200}, {x: 200, y: 200}, {x: 300, y: 200}],
  [{x: 100, y: 300}, {x: 200, y: 300}, {x: 300, y: 300}]
];

/**
 * A util class for dealing with the coordinates of
 * the tic-tac-toe canvas
 */
class CoordinatesUtil {
  /**
   * Given the x & y coordinates on the canvas,
   * get the row & column indexes of the square that was
   * clicked, or undefined if the click was outside of the board
   * @param {number} x the x coordinate of the mouse position
   * @param {number} y the y coordinate of the mouse position
   * @returns {Move} the square clicked
   */
  public static getSquareClicked({x, y}): Move {
    if (x < 100 || x > 400 || y < 100 || y > 400) {
      // Do nothing - the click was outside the board
      return;
    }
    return {
      column: CoordinatesUtil.getRowOrColumnIndex(x),
      row: CoordinatesUtil.getRowOrColumnIndex(y)
    };
  }

  /**
   * Get the index of the row or column based on a
   * single (x or y) coordinate
   * @param {number} coord the coordinate
   * @returns {number} the index of the row or column
   */
  public static getRowOrColumnIndex(coord: number): number {
    if (coord < 200) {
      return 0;
    }
    if (coord < 300) {
      return 1;
    }
    return 2;
  }

  /**
   * Finds the coordinates of the center of the square
   * for the given move
   * @param {any} column the column of the move
   * @param {any} row the row of the move
   * @returns {Coordinates} coordinates of the center of the square
   */
  public static getCenterCoordinatesForMove({column, row}): Coordinates {
    const coordinates = boardCoordinates[row][column];
    return {
      x: coordinates.x + 50,
      y: coordinates.y + 50
    };
  }
}

export default CoordinatesUtil;