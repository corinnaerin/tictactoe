/* tslint:disable only-arrow-functions */
import { expect } from 'chai';
import WinnerController from '../../../server/controllers/winner-controller';
import { Player } from '../../../types';

describe('WinnerController', function() {
  it('should return no winner', function() {
    const board = [
      [-1, -1, 2],
      [2, 1, -1],
      [1, 1, 2]
    ];
    expect(WinnerController.findWinner(board)).to.eql(Player.None);
  });

  it('should return cat\'s game', function() {
    const board = [
      [1, 2, 2],
      [2, 1, 1],
      [1, 1, 2]
    ];
    expect(WinnerController.findWinner(board)).to.eql(Player.Tie);
  });

  it('should find a column winner', function() {
    const board = [
      [1, 1, 2],
      [2, 1, 1],
      [1, 1, 2]
    ];
    expect(WinnerController.findWinner(board)).to.eql(Player.User);
  });

  it('should find a row winner', function() {
    const board = [
      [1, 2, -1],
      [2, -1, 1],
      [2, 2, 2]
    ];
    expect(WinnerController.findWinner(board)).to.eql(Player.AI);
  });

  it('should find a right down diagonal winner', function() {
    const board = [
      [2, 2, -1],
      [1, 2, 1],
      [2, 1, 2]
    ];
    expect(WinnerController.findWinner(board)).to.eql(Player.AI);
  });

  it('should find a left down diagonal winner', function() {
    const board = [
      [1, 2, 1],
      [2, 1, 1],
      [1, -1, 2]
    ];
    expect(WinnerController.findWinner(board)).to.eql(Player.User);
  });
});