import Coordinates from '../model/coordinates';

/**
 * A generic util class for drawing on a canvas
 */
export default class CanvasUtil {

  /**
   * Draws a line on the canvas
   * @param {CanvasRenderingContext2D} context canvas context
   * @param {Coordinates} start the beginning of the line
   * @param {Coordinates} end the end of the line
   */
  public static drawLine(context: CanvasRenderingContext2D, start: Coordinates, end: Coordinates) {
    CanvasUtil.setStrokeStyle(context);
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
  }

  /**
   * Draws text on the canvas
   * @param {CanvasRenderingContext2D} context canvas context
   * @param {string} text the text to render
   * @param {Coordinates} coordinates the coordinates at which to render (centered vertically and horizontally)
   */
  public static drawText(context: CanvasRenderingContext2D, text: string, coordinates: Coordinates) {
    CanvasUtil.setTextStyle(context);
    context.fillText(text, coordinates.x, coordinates.y);
  }

  /**
   * Clear the entire canvas
   * @param {CanvasRenderingContext2D} context
   * @param {HTMLCanvasElement} canvas
   */
  public static clearCanvas(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Sets up the text styling
   * @param {CanvasRenderingContext2D} context
   */
  private static setTextStyle(context: CanvasRenderingContext2D) {
    context.font = '48px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
  }

  /**
   * Set the styling for strokes
   * @param {CanvasRenderingContext2D} context
   */
  private static setStrokeStyle(context: CanvasRenderingContext2D) {
    context.lineCap = 'round';
    context.lineWidth = 4;
    context.fillStyle = 'none';
    context.strokeStyle = '#05386B';
    context.shadowColor = '#4c5a66';
    context.shadowBlur = 6;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
  }
}