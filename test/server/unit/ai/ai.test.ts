/* tslint:disable only-arrow-functions */
/* tslint:disable no-invalid-this */
import AI from '../../../../server/ai/ai';
import MoveUtil from '../../../../server/util/move-util';
import { expect, use } from 'chai';
import TestUtil from '../../../test-util';
import { Move } from '../../../../common/types';
import Board from '../../../../common/board';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

use(sinonChai);

describe('AI', function() {
  beforeEach(function() {
    this.getFirstPossibleMoveStub = sinon.stub(MoveUtil, 'getFirstPossibleMove');
  });

  afterEach(function() {
    sinon.restore();
  });

  it('getHardMove should call MoveUtil to get the hard-level move', function() {
    const randomMove: Move = TestUtil.getRandomMove();
    const randomBoard: Board = TestUtil.getRandomBoard();
    this.getFirstPossibleMoveStub.returns(randomMove);
    const result: Move = AI.getHardMove(randomBoard);
    expect(result).to.deep.eql(randomMove);
    expect(this.getFirstPossibleMoveStub).to.have.been.calledOnce;
    expect(this.getFirstPossibleMoveStub).to.have.been.calledWithExactly(randomBoard, ...AI.HARD_PREFERRED_MOVES);
  });

  it('getMediumMove should call MoveUtil to get the medium-level move', function() {
    const randomMove: Move = TestUtil.getRandomMove();
    const randomBoard: Board = TestUtil.getRandomBoard();
    this.getFirstPossibleMoveStub.returns(randomMove);
    const result: Move = AI.getMediumMove(randomBoard);
    expect(result).to.deep.eql(randomMove);
    expect(this.getFirstPossibleMoveStub).to.have.been.calledOnce;
    expect(this.getFirstPossibleMoveStub).to.have.been.calledWithExactly(randomBoard, ...AI.MEDIUM_PREFERRED_MOVES);
  });

  it('getEasyMove throw an exception if there are no available moves', function() {
    expect(() => AI.getEasyMove(TestUtil.CATS_GAME)).to.throw(MoveUtil.NO_MOVE_FOUND);
  });

  it('getLunaMove throw an exception if there are no available moves', function() {
    expect(() => AI.getLunaMove(TestUtil.CATS_GAME)).to.throw(MoveUtil.NO_MOVE_FOUND);
  });
});