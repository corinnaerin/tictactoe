/* tslint:disable only-arrow-functions */
/* tslint:disable no-invalid-this */
import { MoveFinder } from '../../../../common/types';
import Board from '../../../../common/Board';
import MoveUtil from '../../../../server/util/move-util';
import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import TicTacToeUtil from '../../../../server/util/tic-tac-toe-util';
import TestUtil from '../../../test-util';

use(sinonChai);

describe('MoveUtil', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('searchLinesForMove', function() {
    beforeEach(function() {
      this.moveFinder = {
        lineMoveFinder: sinon.stub().callsFake((param) => param || -1)
      };
      this.board = sinon.createStubInstance(Board);
      this.isValidMoveStub = sinon.stub(TicTacToeUtil, 'isValidMove');
      this.boardHasEmptySquaresStub = sinon.stub(TicTacToeUtil, 'boardHasEmptySquares');

      this.setup = () => {
        this.isValidMoveStub.returns(true);
        this.boardHasEmptySquaresStub.returns(true);
      };
    });

    it('should successfully find a matching move in diagonal 1', function() {
      this.board.getDiagonal1.returns(1);
      this.setup();

      expect(MoveUtil.getFirstPossibleMove(this.board, this.moveFinder)).to.eql({
        row: 1,
        column: 1
      });

      expect(this.moveFinder.lineMoveFinder).to.have.been.calledOnce;
      expect(this.moveFinder.lineMoveFinder).to.have.been.calledWith(1);
    });

    it('should successfully find a matching move in diagonal 2', function() {
      this.setup();
      this.board.getDiagonal2.returns(2);
      expect(MoveUtil.getFirstPossibleMove(this.board, this.moveFinder)).to.eql({
        row: 2,
        column: 0
      });

      expect(this.moveFinder.lineMoveFinder).to.have.been.calledTwice;
      expect(this.moveFinder.lineMoveFinder).to.have.been.calledWith(2);
    });

    it('should successfully find a matching move in a row', function() {
      this.setup();
      this.board.getRows.returns([false, false, 1]);

      expect(MoveUtil.getFirstPossibleMove(this.board, this.moveFinder)).to.eql({
        row: 2,
        column: 1
      });

      expect(this.moveFinder.lineMoveFinder).to.have.callCount(5);
      expect(this.moveFinder.lineMoveFinder).to.have.been.calledWith(false);
      expect(this.moveFinder.lineMoveFinder).to.have.been.calledWith(1);
    });

    it('should successfully find a matching move in a column', function() {
      this.setup();
      this.board.getRows.returns([false, false, false]);
      this.board.getColumns.returns([false, false, 1]);

      expect(MoveUtil.getFirstPossibleMove(this.board, this.moveFinder)).to.eql({
        row: 1,
        column: 2
      });

      expect(this.moveFinder.lineMoveFinder).to.have.callCount(8);
      expect(this.moveFinder.lineMoveFinder).to.have.been.calledWith(false);
      expect(this.moveFinder.lineMoveFinder).to.have.been.calledWith(1);
    });

    it('should not find any matching moves in any line', function() {
      this.setup();
      this.board.getRows.returns([false, false, false]);
      this.board.getColumns.returns([false, false, false]);

      expect(MoveUtil.getFirstPossibleMove(this.board, this.moveFinder)).to.be.undefined;

      expect(this.moveFinder.lineMoveFinder).to.have.callCount(8);
    });

  });

  describe('searchBoardForMove', function() {
    it('should return the result of the move finder', function() {
      sinon.stub(TicTacToeUtil, 'isValidMove').returns(true);
      sinon.stub(TicTacToeUtil, 'boardHasEmptySquares').returns(true);

      const moveFinder: MoveFinder = {
        boardMoveFinder: sinon.stub().returns(1),
        args: ['arg1', 'arg2']
      };
      const board = TestUtil.getRandomBoard();

      expect(MoveUtil.getFirstPossibleMove(board, moveFinder)).to.eql(1);
      expect(moveFinder.boardMoveFinder).to.have.been.calledOnce;
      expect(moveFinder.boardMoveFinder).to.have.been.calledWithExactly(board, 'arg1', 'arg2');
    });
  });

  describe('getFirstPossibleMove', function() {

    beforeEach(function() {
      this.isValidMoveStub = sinon.stub(TicTacToeUtil, 'isValidMove').callsFake((board, value) => !!value);
      this.boardHasEmptySquaresStub = sinon.stub(TicTacToeUtil, 'boardHasEmptySquares');
      this.executeMoveFinderStub = sinon.stub(MoveUtil, 'executeMoveFinder');
    });

    it('should throw an exception if no matching move is found', function() {
      this.isValidMoveStub.returns(false);
      this.boardHasEmptySquaresStub.returns(true);

      expect(() => MoveUtil.getFirstPossibleMove(TestUtil.getRandomBoard(), sinon.stub())).to.throw(MoveUtil.NO_MOVE_FOUND);
      expect(this.executeMoveFinderStub).to.have.been.calledOnce;
    });

    it('should throw an exception if there are no empty squares', function() {
      this.boardHasEmptySquaresStub.returns(false);

      expect(() => MoveUtil.getFirstPossibleMove(this.board, this.moveFinder)).to.throw(MoveUtil.NO_EMPTY_SQUARES);
    });

    it('should return the first matching move', function() {
      this.boardHasEmptySquaresStub.returns(true);
      const moveFinders: MoveFinder[] = [ {}, {}, {}, {} ];

      this.executeMoveFinderStub.onThirdCall().returns('ThirdCall');
      this.executeMoveFinderStub.onCall(4).returns('FourthCall');

      expect(MoveUtil.getFirstPossibleMove(TestUtil.getRandomBoard(), ...moveFinders)).to.eql('ThirdCall');
      expect(this.executeMoveFinderStub).to.have.callCount(3);
    });
  });
});