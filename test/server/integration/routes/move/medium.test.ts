/* tslint:disable only-arrow-functions */
/* tslint:disable no-invalid-this */
import { Player } from '../../../../../common/types';
import { expect } from 'chai';
import TestUtil from '../../../../test-util';

/**
 * Tests general processing & error handling of the API
 */
describe('/api/move/medium', function() {

  beforeEach(function() {
    this.testRequest = TestUtil.getTestRequest(`/api/move/hard`);
  });

  it('should return a winning move', async function() {
    const board = [
      [Player.AI, Player.User, Player.AI],
      [Player.User, Player.AI, Player.None],
      [Player.None, Player.User, Player.User]
    ];

    await TestUtil.testRequestSuccess(this.testRequest, board, {
      winner: Player.AI,
      move: {
        row: 2,
        column: 0
      }
    });
  });

  it('should return the user\'s winning move', async function() {
    const board = [
      [Player.AI, Player.User, Player.AI],
      [Player.User, Player.User, Player.None],
      [Player.None, Player.AI, Player.None]
    ];

    await TestUtil.testRequestSuccess(this.testRequest, board, {
      winner: Player.None,
      move: {
        row: 1,
        column: 2
      }
    });
  });
});