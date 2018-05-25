import CoordinatesHelper from './CoordinatesHelper';

class Board {
  public readonly state: number[][];
  private readonly context: CanvasRenderingContext2D;

  constructor(context) {
    this.context = context;
    this.state = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }

  public drawBoard() {
    this.setStrokeStyle();

    this.context.beginPath();
    this.context.moveTo(200, 100);
    this.context.lineTo(200, 400);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(300, 100);
    this.context.lineTo(300, 400);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(100, 200);
    this.context.lineTo(400, 200);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(100, 200);
    this.context.lineTo(400, 200);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(100, 300);
    this.context.lineTo(400, 300);
    this.context.stroke();
  }

  public drawCircleInSquare(square) {
    const squareCoordinates = CoordinatesHelper.getCoordinatesForSquare(square);
    const centerX = squareCoordinates.x + 50;
    const centerY = squareCoordinates.y + 50;
    const radius = 30;

    this.context.beginPath();
    this.setStrokeStyle();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.stroke();

    this.state[square.row][square.col] = 2;
  }

  public setStrokeStyle() {
    this.context.lineCap = 'round';
    this.context.lineWidth = 4;
    this.context.fillStyle = 'none';
    this.context.strokeStyle = '#116466';
    this.context.shadowColor = '#4c5a66';
    this.context.shadowBlur = 6;
    this.context.shadowOffsetX = 2;
    this.context.shadowOffsetY = 2;
  }

  public drawXInSquare(square) {
    const squareCoordinates = CoordinatesHelper.getCoordinatesForSquare(square);

    this.context.beginPath();
    this.setStrokeStyle();
    this.context.moveTo(squareCoordinates.x + 80, squareCoordinates.y + 20);
    this.context.lineTo(squareCoordinates.x + 20, squareCoordinates.y + 80);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(squareCoordinates.x + 20, squareCoordinates.y + 20);
    this.context.lineTo(squareCoordinates.x + 80, squareCoordinates.y + 80);
    this.context.stroke();

    this.state[square.row][square.col] = 1;
  }

}

export default Board;