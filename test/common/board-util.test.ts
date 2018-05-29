/* tslint:disable only-arrow-functions */
/* tslint:disable no-invalid-this */
import Board from '../../common/board';
import { expect } from 'chai';
import TestUtil from '../test-util';
import BoardUtil from '../../common/board-util';
import { Player } from '../../common/types';

describe('Board', function() {
  it('should clone the given immutable board', function() {
    const board = TestUtil.getRandomBoard();
    const clonedBoard = BoardUtil.cloneBoard(board);
    expect(board).to.deep.eql(clonedBoard);
    expect(board).to.not.equal(clonedBoard);
  });

  it('should clone the given immutable board and then make a move', function() {
    const board = TestUtil.getRandomBoard();
    const move = {
      row: 1,
      column: 1
    };
    const clonedBoard = BoardUtil.makeMoveImmutable(board, move, Player.Tie);
    expect(board).to.not.equal(clonedBoard);
    expect(clonedBoard.get(move)).to.eql(Player.Tie);
    expect(board.get(move)).to.not.eql(Player.Tie);
  });
});