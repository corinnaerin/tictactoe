const boardCoordinates = [
  [{x: 100, y: 100}, {x: 200, y: 100}, {x: 300, y: 100}],
  [{x: 100, y: 200}, {x: 200, y: 200}, {x: 300, y: 200}],
  [{x: 100, y: 300}, {x: 200, y: 300}, {x: 300, y: 300}]
];

class CoordinatesHelper {
  public static getSquareClicked({x, y}) {
    if (x < 100 || x > 400 || y < 100 || y > 400) {
      console.log('Outside board');
      return;
    }
    return {
      col: CoordinatesHelper.getRowOrColumnIndex(x),
      row: CoordinatesHelper.getRowOrColumnIndex(y)
    };
  }

  public static getRowOrColumnIndex(coord) {
    if (coord < 200) {
      return 0;
    }
    if (coord < 300) {
      return 1;
    }
    return 2;

  }

  public static getCoordinatesForSquare({col, row}) {
    return boardCoordinates[row][col];
  }
}

export default CoordinatesHelper;