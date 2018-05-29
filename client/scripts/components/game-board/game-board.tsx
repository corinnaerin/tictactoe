import * as React from 'react';
import { Difficulty, Move, Player } from '../../../../common/types';
import { connect } from 'react-redux';
import GameCanvas from '../../canvas/game-canvas';
import CoordinatesUtil from '../../canvas/coordinates-util';
import store from '../../store/store';
import moveSaga from '../../saga/move-saga';
import winnerSaga from '../../saga/winner-saga';
import Board from '../../../../common/board';
import BoardUtil from '../../../../common/board-util';
import { aiIcons } from '../../model/ai-icons';

const styles = require('./game-board.css');

interface StateProps {
  /**
   * Whether the game is in progress
   */
  gameInProgress: boolean;
  /**
   * The currently selected game difficulty
   */
  difficulty: Difficulty;

  /**
   * The state of the tic-tac-toe board
   */
  board: Board;

  /**
   * The player whose turn it is
   */
  turn: Player;

  /**
   * The last move that was made
   */
  lastMove: Move;

  /**
   * The icon selected by the user for their character
   */
  userIcon: string;
}

interface DispatchProps {
  /**
   * The click handler to make a move when the user clicks a square
   */
  makeMove: React.MouseEventHandler<HTMLCanvasElement>;
}

interface Props extends StateProps, DispatchProps {
}

interface State {
  /**
   * The object that controls all of the updates to the canvas
   */
  gameCanvas: GameCanvas;
}

/**
 * This component handles the game state: triggering API
 * calls to get the next move and whether there's a winner,
 * as well as executing functions on the GameCanvas object,
 * which handles the actual drawing to the canvas element
 */
class GameBoard extends React.Component<Props, State> {
  private readonly canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props) {
    super(props);
    this.state = {
      gameCanvas: new GameCanvas()
    };
    this.canvasRef = React.createRef();
    this.onClick = this.onClick.bind(this);
  }

  /**
   * We need to wait until the actual canvas has been rendered
   * before we can initialize the GameCanvas object, or it will
   * try to get the context for a non-existent element
   */
  public componentDidMount() {
    this.state.gameCanvas.init(this.canvasRef.current);
  }

  /**
   * This function handles all the side-effects of the props changing
   * This is an abnormal react component because actual visual changes
   * need to happen on the canvas, which isn't managed directly by react.
   * Generally speaking this lifecycle method is for doing API calls and
   * other side effects, so I've stretched it's definition ever so slightly
   * to include "update the canvas" in the definition of side effect.
   *
   * This function handles:
   * * Clearing the board when a new game starts
   * * Telling the GameCanvas to draw a move for the *previous* props
   * * Triggering a call to get the AI's move
   *
   * Basically, we are only drawing the previous turn once the next turn
   * has started. This is because we need to wait for the winner or move
   * API to complete and give us it's answer, at which point the saga
   * will update the props which will trigger this method. That's why
   * we're drawing the move from prevProps, not the current props.
   *
   * @param {Props} prevProps
   */
  public componentDidUpdate(prevProps: Props) {
    // If the game is in progress, but we don't have a move to render
    // clear the board
    if (this.props.gameInProgress && !this.props.lastMove) {
      this.state.gameCanvas.reset();
    }

    // If the turn has changed, process the turn that was just made
    if (this.props.lastMove && prevProps.turn !== this.props.turn) {
      // Actually draw the last move made, either for the user or the AI
      const icon = prevProps.turn === Player.AI ? aiIcons[this.props.difficulty] : this.props.userIcon;
      this.state.gameCanvas.drawMove(this.props.lastMove, icon);
    }

    // It's currently the AI's turn, trigger the API call to get its move
    if (this.props.turn === Player.AI && this.props.gameInProgress) {
      // Put the AI move inside a set timeout so it doesn't look so creepy at
      // how fast it responds!
      setTimeout(() => {
        moveSaga.trigger(store, {
          board: this.props.board,
          difficulty: this.props.difficulty
        });
      }, 750);
    }
  }

  /**
   * Click handler for the entire canvas element, designed to handle a user's
   * move. If it's not the user's turn, it does nothing. This finds the mouse position
   * within the canvas, determines what if any square was clicked, and if it's a
   * valid move, then triggers the winner saga to check if the user has just won
   * @param {React.MouseEvent<HTMLCanvasElement>} event
   */
  public onClick(event: React.MouseEvent<HTMLCanvasElement>) {
    if (this.props.turn === Player.User) {
      const mousePosition = this.state.gameCanvas.getMousePosition(event);
      const move: Move = CoordinatesUtil.getSquareClicked(mousePosition);
      if (move !== undefined && this.props.board.get(move) === Player.None) {
        // Trigger the winner saga, which will query the server to see if there's a winner
        // after the user's move, which will trickle down and trigger componentDidUpdate which
        // will actually draw this move. This is for consistency between a user's move and an AI move
        const newBoard = BoardUtil.makeMoveImmutable(this.props.board, move, Player.User);
        winnerSaga.trigger(store, {
          board: newBoard,
          move
        });
      }
    }
  }

  public render(): JSX.Element {
    return (
        <canvas
            className={styles.canvas}
            ref={this.canvasRef}
            width='300'
            height='300'
            onClick={this.props.gameInProgress ? this.onClick : null}
        />
    );
  }
}

const mapStateToProps = ({ gameInProgress, turn, lastMove, userIcon, board, difficulty }): StateProps => {
  return { gameInProgress, turn, lastMove, userIcon, board, difficulty };
};

export default connect(mapStateToProps)(GameBoard);