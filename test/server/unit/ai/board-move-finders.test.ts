/* tslint:disable only-arrow-functions */
/* tslint:disable no-invalid-this */
import Board from '../../../../common/board';
import { expect } from 'chai';
import { Move, Player } from '../../../../common/types';
import { middleSquare, randomSquare } from '../../../../server/ai/board-move-finders';
import TestUtil from '../../../test-util';
import BoardUtil from '../../../../common/board-util';

describe('Board-based move finders', function() {
  describe('middle square move finder', function() {
    it('should successfully find a middle square move when the square is empty', function() {
      const board = new Board([
        [ Player.AI, Player.User, Player.AI],
        [ Player.User, Player.None, Player.None],
        [ Player.None, Player.User, Player.AI]
      ]);

      expect(middleSquare(board)).to.eql({
        row: 1,
        column: 1
      });
    });

    it('should not return a move when the square is the AI', function() {
      const board = new Board([
        [ Player.None, Player.User, Player.AI],
        [ Player.User, Player.AI, Player.None],
        [ Player.None, Player.User, Player.User]
      ]);
      expect(middleSquare(board)).to.not.exist;
    });

    it('should not return a move when the square is the user', function() {
      const board = new Board([
        [ Player.None, Player.AI, Player.AI],
        [ Player.User, Player.User, Player.None],
        [ Player.None, Player.User, Player.User]
      ]);
      expect(middleSquare(board)).to.not.exist;
    });
  });

  describe('random move finder', function() {
    it('should not return a move when the board is full', function() {
      const move: Move = randomSquare(TestUtil.CATS_GAME);
      expect(move).not.to.exist;
    });

    it('should return a random valid move if there are open squares', function() {
      TestUtil.assertRandomEquitableDistribution(() => {
        const move: Move = randomSquare(BoardUtil.EMPTY_BOARD);
        expect(move).to.exist;
        return move;
      }, 9);
    });
  });
});