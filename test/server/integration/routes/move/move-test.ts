/* tslint:disable only-arrow-functions */
/* tslint:disable no-invalid-this */
import Board from '../../../../../common/board';
import TestUtil from '../../../../test-util';
import TicTacToeUtil from '../../../../../server/util/tic-tac-toe-util';
import { expect } from 'chai';
import * as log from 'fancy-log';
import MoveUtil from '../../../../../server/util/move-util';

['easy', 'medium', 'hard'].forEach(function(difficulty) {
  describe(`/api/move/${difficulty}`, function() {
    before(function() {
      this.testRequest = TestUtil.getTestRequest(`/api/move/${difficulty}`);
    });

    it('should always return a valid move', async function() {
      this.timeout(3000);
      await TestUtil.testAsyncManyTimes(async () => {

        const boardRaw = TestUtil.getRandomBoardRaw();
        const board = new Board(boardRaw);

        if (!TicTacToeUtil.boardHasEmptySquares(board)) {
          // If we manage to get a random board without any empty squares, just skip
          return;
        }

        try {
          await this.testRequest
              .send(boardRaw)
              .expect(200)
              .expect('Content-Type', /json/)
              .expect((response) => {
                expect(response).to.be.ok;
                expect(response.body).to.be.ok;
                expect(response.body.winner).to.exist;
                expect(TicTacToeUtil.isValidMove(board, response.body.move));
              });
        } catch (error) {
          log.error(`Failed to find a valid move for board ${JSON.stringify(boardRaw)}`);
          throw error;
        }
      }, 100);
    });

    it('should fail if there are no empty squares', async function() {
      await this.testRequest
          .send(TestUtil.CATS_GAME_RAW)
          .expect('Content-Type', /text/)
          .expect(400, MoveUtil.NO_EMPTY_SQUARES);
    });
  });
});