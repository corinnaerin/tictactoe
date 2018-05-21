/* tslint:disable only-arrow-functions */
import server from '../../../../server/server';
import * as request from 'supertest';
import { Player, TicTacToeRequest } from '../../../../common/types';
import { expect } from 'chai';
import TestUtil from '../../../test-util';

const app = server.app;

/**
 * Tests general processing & error handling of the API
 */
describe('/api/winner', function() {
  function testSuccess(payload: TicTacToeRequest, expectedWinner: Player) {
    return request(app)
        .post('/api/winner')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200, { winner: expectedWinner });
  }

  it('should successfully find a winner in diagonal 1', function() {
    const board = [
      [Player.AI, Player.User, Player.AI],
      [Player.User, Player.AI, Player.None],
      [Player.None, Player.User, Player.AI]
    ];

    return testSuccess(board, Player.AI);
  });

  it('should successfully find a winner in diagonal 2', function() {
    const board = [
      [Player.None, Player.User, Player.AI],
      [Player.User, Player.AI, Player.None],
      [Player.AI, Player.User, Player.User]
    ];
    return testSuccess(board, Player.AI);

  });

  it('should successfully find a winner in a row', function() {
    const board = [
      [ Player.None, Player.User, Player.None],
      [ Player.AI, Player.AI, Player.None],
      [ Player.User, Player.User, Player.User]
    ];
    return testSuccess(board, Player.User);
  });

  it('should successfully find a winner in a column', function() {
    const board = [
      [ Player.AI, Player.User, Player.User],
      [ Player.AI, Player.AI, Player.User],
      [ Player.None, Player.AI, Player.User]
    ];
    return testSuccess(board, Player.User);
  });

  it('should not find a winner in an incomplete board', function() {
    const board = [
      [ Player.None, Player.User, Player.AI],
      [ Player.User, Player.None, Player.None],
      [ Player.None, Player.None, Player.None]
    ];
    return testSuccess(board, Player.None);

  });

  it('should not find a winner in a cat\'s game', function() {
    return testSuccess(TestUtil.CATS_GAME_RAW, Player.Tie);
  });
});