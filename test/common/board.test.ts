/* tslint:disable only-arrow-functions */
/* tslint:disable no-invalid-this */
import Board from '../../common/board';
import { expect } from 'chai';
import { Player } from '../../common/types';

describe('Board', function() {
  before(function() {
    this.initValue = [
      [1, 2, -1],
      [-1, 1, 2],
      [2, -1, 2]
    ];
    this.board = new Board(this.initValue);
  });

  it('should throw an exception when initialized with an empty param', function() {
    return testFailure();
  });

  it('should throw an exception when initialized with an empty array', function() {
    return testFailure([]);
  });

  it('should throw an exception when initialized with an empty object', function() {
    return testFailure({});
  });

  it('should throw an exception when initialized with a 1-dimensional array', function() {
    return testFailure([1, 2, 3]);
  });

  it('should throw an exception when initialized with a 2-dimensional array of the wrong length', function() {
    return testFailure([[1], [2], [3]]);
  });

  it('should throw an exception when initialized with a 2-dimensional array of the wrong length', function() {
    return testFailure([[1], [2], [3]]);
  });

  it('should throw an exception when initialized with a 2-dimensional array of the right size but wrong numbers', function() {
    return testFailure([
      [1, 2, -1],
      [-1, 4, 2],
      [2, -1, 2]
    ]);
  });

  it('should correctly parse columns', function() {
    expect(this.board.getColumns()).to.eql([
      [1, -1, 2],
      [2, 1, -1],
      [-1, 2, 2]
    ]);
  });

  it('should correctly return rows', function() {
    expect(this.board.getRows()).to.eql(this.initValue);
  });

  it('should correct parse diagonal 1', function() {
    expect(this.board.getDiagonal1()).to.eql([1, 1, 2]);
  });

  it('should correct parse diagonal 2', function() {
    expect(this.board.getDiagonal2()).to.eql([-1, 1, 2]);
  });

  it('should return all possible lines', function() {
    expect(this.board.getAllLines()).to.eql([
      [1, 1, 2],
      [-1, 1, 2],
      [1, 2, -1],
      [-1, 1, 2],
      [2, -1, 2],
      [1, -1, 2],
      [2, 1, -1],
      [-1, 2, 2]
    ]);
  });

  it('should update and query the board successfully', function() {
    const square = { row: 0, column: 2 };
    expect(this.board.get(square)).to.eql(Player.None);
    this.board.set(square, Player.AI);
    expect(this.board.get(square)).to.eql(Player.AI);
  });

  function testFailure(param?) {
    expect(() => new Board(param)).to.throw('Invalid board: must be a 3x3 2-dimensional array containing only -1, 1, or 2');
  }
});