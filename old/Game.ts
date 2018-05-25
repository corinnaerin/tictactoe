import Board from '../common/board';

class Game {
  public winner: number;
  private readonly board: Board;
  private player: number;

  constructor(board: Board) {
    this.board = board;
    this.player = 1;
    this.winner = -1;
  }

  public makeMove(squareClicked) {
    if (squareClicked && this.board.state[squareClicked.row][squareClicked.col] === 0) {
      if (this.player === 1) {
        this.board.drawXInSquare(squareClicked);
      } else {
        this.board.drawCircleInSquare(squareClicked);
      }
      this.setWinner();

      if (this.winner === -1) {
        this.player = this.player === 1 ? 2 : 1;
      }
    } else {
      console.warn('Clicked square already taken or no square at all!');
    }
  }

  public gameOver() {
    return this.winner !== -1;
  }

  /**
   * Sets the winner based on the current state of the board:
   * 0 = Cat's game (tie)
   * 1 = X won
   * 2 = O won
   * -1 = Board is incomplete
   */
  public setWinner() {
    this.winner = 0;

    this.winner = this.checkDownRightDiagonal() || this.winner;
    if (this.winner > 0) {
      return;
    }

    this.winner = this.checkDownLeftDiagonal() || this.winner;
    if (this.winner > 0) {
      return;
    }

    // Check rows
    for (let i = 0; i < 3; i++) {
      this.winner = this.checkRow(this.board.state[i]) || this.winner;
      if (this.winner > 0) {
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      this.winner = this.checkColumn(i) || this.winner;
      if (this.winner > 0) {
        return;
      }
    }
  }

  private checkRow(row) {
    const hasZeros = row.findIndex(value => value === 0) !== -1;
    if (hasZeros) {
      return -1;
    }
    const lookingFor = row[0];
    if (row.every(value => value === lookingFor)) {
      return lookingFor;
    }
    return 0;
  }

  private checkColumn(columnIndex) {
    const hasZeros = this.board.state.findIndex(row => row[columnIndex] === 0) !== -1;
    if (hasZeros) {
      return -1;
    }
    const lookingFor = this.board.state[0][columnIndex];
    if (this.board.state.every(row => row[columnIndex] === lookingFor)) {
      return lookingFor;
    }
    return 0;
  }

  /**
   * Check the diagonal that starts at the top right corner
   */
  private checkDownLeftDiagonal() {
    const lookingFor = this.board.state[0][2];
    if (lookingFor === 0) {
      return -1;
    }
    if (this.board.state.every((row, index) => row[2 - index] === lookingFor)) {
      return lookingFor;
    }
    return 0;
  }

  /**
   * Check the diagonal that starts at the top left corner
   */
  private checkDownRightDiagonal() {
    const lookingFor = this.board.state[0][0];
    if (lookingFor === 0) {
      return -1;
    }
    if (this.board.state.every((row, index) => row[index] === lookingFor)) {
      return lookingFor;
    }
    return 0;
  }
}

export default Game;