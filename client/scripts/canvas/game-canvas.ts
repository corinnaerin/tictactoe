import { Move } from '../../../common/types';
import { MouseEvent } from 'react';
import CanvasUtil from './canvas-util';
import CoordinatesUtil from './coordinates-util';
import Coordinates from '../model/coordinates';

/**
 * Manages all interactions to the tic-tac-toe
 * canvas.
 */
export default class GameCanvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private boundingClientRect: ClientRect;

  constructor() {
    this.getMousePosition = this.getMousePosition.bind(this);
  }

  /**
   * Initialize the canvas and draw an empty board
   * This is not done in the constructor because it is not
   * called until the componentDidMount lifecycle method, at
   * which point the canvas actually exists.
   * @param {HTMLCanvasElement} canvas the DOM element for the canvas
   */
  public init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.boundingClientRect = this.canvas.getBoundingClientRect();
    this.drawEmptyBoard();
  }

  /**
   * Start over: clear the canvas and re-draw an empty board
   */
  public reset() {
    CanvasUtil.clearCanvas(this.context, this.canvas);
    this.drawEmptyBoard();
  }

  /**
   * Draw a single move
   * @param {Move} move the coordinates of the move
   * @param {string} symbol the symbol to draw in the square
   */
  public drawMove(move: Move, symbol: string) {
    const coordinates = CoordinatesUtil.getCenterCoordinatesForMove(move);
    CanvasUtil.drawText(this.context, symbol, coordinates);
  }

  /**
   * Get the mouse coordinates relative to the bounds of the canvas
   * @param {React.MouseEvent<HTMLCanvasElement>} event the click event
   * @returns {Coordinates}
   */
  public getMousePosition(event: MouseEvent<HTMLCanvasElement>): Coordinates {
    return {
      x: event.clientX - this.boundingClientRect.left,
      y: event.clientY - this.boundingClientRect.top
    };
  }

  /**
   * Draw the lines for an empty board
   */
  private drawEmptyBoard() {
    CanvasUtil.drawLine(this.context, { x: 200, y: 100 }, { x: 200, y: 400 });
    CanvasUtil.drawLine(this.context, { x: 300, y: 100 }, { x: 300, y: 400 });
    CanvasUtil.drawLine(this.context, { x: 100, y: 200 }, { x: 400, y: 200 });
    CanvasUtil.drawLine(this.context, { x: 100, y: 300 }, { x: 400, y: 300 });
  }

}