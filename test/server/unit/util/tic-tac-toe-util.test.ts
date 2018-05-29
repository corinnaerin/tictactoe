/* tslint:disable only-arrow-functions */
/* tslint:disable no-invalid-this */
import { Line, Move, Player } from '../../../../common/types';
import Board from '../../../../common/board';
import { expect } from 'chai';
import TicTacToeUtil from '../../../../server/util/tic-tac-toe-util';
import TestUtil from '../../../test-util';
import BoardUtil from '../../../../common/board-util';

describe('TicTacToeUtil', function() {
  describe('findWinner', function() {
    it('should return no winner', function() {
      const board = [
        [Player.None, Player.None, Player.AI],
        [Player.AI, Player.User, Player.None],
        [Player.User, Player.User, Player.AI]
      ];
      expect(TicTacToeUtil.findWinner(new Board(board))).to.eql(Player.None);
    });

    it('should return cat\'s game', function() {
      expect(TicTacToeUtil.findWinner(TestUtil.CATS_GAME)).to.eql(Player.Tie);
    });

    it('should find a column winner', function() {
      const board = [
        [Player.User, Player.User, Player.AI],
        [Player.AI, Player.User, Player.User],
        [Player.User, Player.User, Player.AI]
      ];
      expect(TicTacToeUtil.findWinner(new Board(board))).to.eql(Player.User);
    });

    it('should find a row winner', function() {
      const board = [
        [Player.User, Player.AI, Player.None],
        [Player.AI, Player.None, Player.User],
        [Player.AI, Player.AI, Player.AI]
      ];
      expect(TicTacToeUtil.findWinner(new Board(board))).to.eql(Player.AI);
    });

    it('should find a right down diagonal winner', function() {
      const board = [
        [Player.AI, Player.AI, Player.None],
        [Player.User, Player.AI, Player.User],
        [Player.AI, Player.User, Player.AI]
      ];
      expect(TicTacToeUtil.findWinner(new Board(board))).to.eql(Player.AI);
    });

    it('should find a left down diagonal winner', function() {
      const board = [
        [Player.User, Player.AI, Player.User],
        [Player.AI, Player.User, Player.User],
        [Player.User, Player.None, Player.AI]
      ];
      expect(TicTacToeUtil.findWinner(new Board(board))).to.eql(Player.User);
    });
  });

  it('should calculate the opponent', function() {
    expect(TicTacToeUtil.getOpponent(Player.AI)).to.eql(Player.User);
    expect(TicTacToeUtil.getOpponent(Player.User)).to.eql(Player.AI);
  });

  it('should determine if opponent has claimed squares in row', function() {
    const line: Line = [ Player.None, Player.User, Player.None ];
    expect(TicTacToeUtil.checkForOpponent(line, Player.AI)).to.be.true;
    expect(TicTacToeUtil.checkForOpponent(line, Player.User)).to.be.false;
  });

  it('should determine if a board has empty squares', function() {
    expect(TicTacToeUtil.boardHasEmptySquares(BoardUtil.EMPTY_BOARD)).to.be.true;
    expect(TicTacToeUtil.boardHasEmptySquares(TestUtil.CATS_GAME)).to.be.false;
  });

  it('should determine if a line has empty squares', function() {
    expect(TicTacToeUtil.lineHasEmptySquares([ Player.AI, Player.None, Player.AI ])).to.be.true;
    expect(TicTacToeUtil.lineHasEmptySquares([ Player.AI, Player.User, Player.AI ])).to.be.false;
  });

  it('should determine if a line is completely true', function() {
    expect(TicTacToeUtil.isLineEmpty(TestUtil.EMPTY_LINE)).to.be.true;
    expect(TicTacToeUtil.isLineEmpty([ Player.AI, Player.None, Player.AI ])).to.be.false;
    expect(TicTacToeUtil.isLineEmpty([ Player.AI, Player.User, Player.AI ])).to.be.false;
  });

  it('should return the number of squares for a given player in a line', function() {
    expect(TicTacToeUtil.getNumberSquaresClaimed(TestUtil.EMPTY_LINE, Player.AI)).to.eql(0);
    expect(TicTacToeUtil.getNumberSquaresClaimed([ Player.AI, Player.None, Player.AI ], Player.AI)).to.eql(2);
  });

  it('should check if the given move is still available in the board', function() {
    const board = new Board([
      [Player.User, Player.AI, Player.User],
      [Player.AI, Player.User, Player.User],
      [Player.User, Player.None, Player.AI]
    ]);
    expect(TicTacToeUtil.isValidMove(board, { row: 1, column: 0})).to.be.false;
    expect(TicTacToeUtil.isValidMove(board, { row: 2, column: 1})).to.be.true;
  });

  it('should check if the moves are deeply equal', function() {
    expect(TicTacToeUtil.equalMoves({ row: 1, column: 1}, { row: 1, column: 1})).to.be.true;
    expect(TicTacToeUtil.equalMoves({ row: 1, column: 2}, { row: 1, column: 1})).to.be.false;
  });

  it('should identify a winning move', function() {
    const board = new Board([
      [Player.User, Player.AI, Player.User],
      [Player.None, Player.User, Player.User],
      [Player.User, Player.None, Player.AI]
    ]);

    const move: Move = {
      row: 1,
      column: 0
    };

    expect(TicTacToeUtil.isWinningMove(move, board, Player.User)).to.be.true;
  });

  it('should return false for an invalid move', function() {
    expect(TicTacToeUtil.isWinningMove(TestUtil.getRandomMove(), TestUtil.CATS_GAME, Player.User)).to.be.false;
  });
});