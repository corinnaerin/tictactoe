/* tslint:disable only-arrow-functions */
/* tslint:disable no-invalid-this */
import { winningMove, secondInLine, firstInLine } from '../../../../server/ai/line-move-finders';
import { expect, use } from 'chai';
import { Line, Player } from '../../../../common/types';
import TestUtil from '../../../test-util';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import TicTacToeUtil from '../../../../server/util/tic-tac-toe-util';
import RandomUtil from '../../../../server/util/random-util';

use(sinonChai);

describe('Line-based move finders', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('winning move finder', function() {
    beforeEach(function() {
      this.getNumberSquaresClaimedStub = sinon.stub(TicTacToeUtil, 'getNumberSquaresClaimed');
    });

    it('should successfully find a winning move', function() {
      this.getNumberSquaresClaimedStub.returns(2);
      const line: Line = [ Player.User, Player.None, Player.User ];

      expect(winningMove(line, Player.User)).to.eql(1);
      expect(this.getNumberSquaresClaimedStub).to.have.been.calledOnce;
      expect(this.getNumberSquaresClaimedStub).to.have.been.calledWithExactly(line, Player.User);
    });

    it('should not find a winning move in an empty row', function() {
      this.getNumberSquaresClaimedStub.returns(0);

      expect(winningMove(TestUtil.EMPTY_LINE, Player.AI)).to.eql(-1);
      expect(this.getNumberSquaresClaimedStub).to.have.been.calledOnce;
      expect(this.getNumberSquaresClaimedStub).to.have.been.calledWithExactly(TestUtil.EMPTY_LINE, Player.AI);
    });

    it('should not find a winning move in a full row', function() {
      this.getNumberSquaresClaimedStub.returns(3);
      const line: Line = [ Player.User, Player.AI, Player.User ];

      expect(winningMove(line, Player.AI)).to.eql(-1);
      expect(this.getNumberSquaresClaimedStub).to.have.been.calledOnce;
      expect(this.getNumberSquaresClaimedStub).to.have.been.calledWithExactly(line, Player.AI);
    });

    it('should not find a winning move in an almost empty row', function() {
      this.getNumberSquaresClaimedStub.returns(1);
      const line: Line = [ Player.None, Player.None, Player.User ];

      expect(winningMove(line, Player.User)).to.eql(-1);
      expect(this.getNumberSquaresClaimedStub).to.have.been.calledOnce;
      expect(this.getNumberSquaresClaimedStub).to.have.been.calledWithExactly(line, Player.User);
    });
  });

  describe('second in line move finder', function() {
    before(function() {
      this.standardAssert = (line: Line, player: Player, calledForRandom: boolean = false) => {
        expect(this.checkForOpponentStub).to.have.been.calledOnce;
        expect(this.checkForOpponentStub).to.have.been.calledWithExactly(line, player);

        expect(this.getNumberSquaresClaimedStub).to.have.been.calledOnce;
        expect(this.getNumberSquaresClaimedStub).to.have.been.calledWithExactly(line, player);

        expect(this.getRandomBoolStub).to.have.callCount(calledForRandom ? 1 : 0);
      };
    });

    beforeEach(function() {
      this.getNumberSquaresClaimedStub = sinon.stub(TicTacToeUtil, 'getNumberSquaresClaimed');
      this.checkForOpponentStub = sinon.stub(TicTacToeUtil, 'checkForOpponent');
      this.getRandomBoolStub = sinon.stub(RandomUtil, 'getRandomBool');
    });

    it('should pick the center if the right-most is claimed and the rest are empty', function() {
      this.getNumberSquaresClaimedStub.returns(1);
      this.checkForOpponentStub.returns(false);

      const line: Line = [ Player.None, Player.None, Player.User ];
      expect(secondInLine(line, Player.User)).to.eql(1);

      this.standardAssert(line, Player.User);
    });

    it('should pick the center if the left-most is claimed and the rest are empty', function() {
      this.getNumberSquaresClaimedStub.returns(1);
      this.checkForOpponentStub.returns(false);

      const line: Line = [ Player.AI, Player.None, Player.None ];
      expect(secondInLine(line, Player.AI)).to.eql(1);

      this.standardAssert(line, Player.AI);

    });

    it('should pick the left if the random boolean is true if the center is claimed and the rest are empty', function() {
      this.getNumberSquaresClaimedStub.returns(1);
      this.checkForOpponentStub.returns(false);
      this.getRandomBoolStub.returns(true);

      const line: Line = [ Player.None, Player.User, Player.None ];
      const index = secondInLine(line, Player.User);
      expect(index).to.eql(0);

      this.standardAssert(line, Player.User, true);
    });

    it('should pick the right if the random boolean is false if the center is claimed and the rest are empty', function() {
      this.getNumberSquaresClaimedStub.returns(1);
      this.checkForOpponentStub.returns(false);
      this.getRandomBoolStub.returns(false);

      const line: Line = [ Player.None, Player.User, Player.None ];
      const index = secondInLine(line, Player.User);
      expect(index).to.eql(2);

      this.standardAssert(line, Player.User, true);
    });

    it('should not find a move if the row is empty', function() {
      this.getNumberSquaresClaimedStub.returns(0);
      this.checkForOpponentStub.returns(false);

      expect(secondInLine(TestUtil.EMPTY_LINE, Player.AI)).to.eql(-1);

      expect(this.getNumberSquaresClaimedStub).to.have.been.calledOnce;
      expect(this.getNumberSquaresClaimedStub).to.have.been.calledWithExactly(TestUtil.EMPTY_LINE, Player.AI);

      expect(this.checkForOpponentStub).to.have.callCount(0);
      expect(this.getRandomBoolStub).to.have.callCount(0);
    });

    it('should not find a move if the opponent has claimed any of the line', function() {
      this.getNumberSquaresClaimedStub.returns(1);
      this.checkForOpponentStub.returns(true);
      const line: Line = [ Player.None, Player.User, Player.None ];
      expect(secondInLine(line, Player.AI)).to.eql(-1);

      this.standardAssert(line, Player.AI);
    });
  });

  describe('first in line move finder', function() {
    beforeEach(function() {
      this.isLineEmptyStub = sinon.stub(TicTacToeUtil, 'isLineEmpty');
      this.getRandomIntStub = sinon.stub(RandomUtil, 'getRandomInt');
    });

    it('should not find a move if the row is empty', function() {
        this.isLineEmptyStub.returns(false);
        expect(firstInLine(TestUtil.EMPTY_LINE)).to.eql(-1);
        expect(this.isLineEmptyStub).to.have.been.calledOnce;
        expect(this.getRandomIntStub).to.have.callCount(0);
    });

    it('should return a random index if the row is empty', function() {
      this.isLineEmptyStub.returns(true);
      this.getRandomIntStub.returns(50);
      expect(firstInLine(TestUtil.EMPTY_LINE)).to.eql(50);
      expect(this.isLineEmptyStub).to.have.been.calledOnce;
      expect(this.getRandomIntStub).to.have.been.calledOnce;
      expect(this.getRandomIntStub).to.have.been.calledWithExactly(3);
    });
  });
});