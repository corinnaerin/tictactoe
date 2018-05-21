/* tslint:disable only-arrow-functions */
/* tslint:disable no-invalid-this */
import { Player } from '../../../../../common/types';
import { expect } from 'chai';
import TestUtil from '../../../../test-util';

/**
 * Tests general processing & error handling of the API
 */
describe('/api/move/easy', function() {

  beforeEach(function() {
    this.testRequest = TestUtil.getTestRequest(`/api/move/easy`);
  });

  it('should not return the winning move', async function() {
    const board = [
      [Player.AI, Player.User, Player.User],
      [Player.User, Player.AI, Player.None],
      [Player.User, Player.AI, Player.None]
    ];

    await TestUtil.testRequestSuccess(this.testRequest, board, {
      winner: Player.None,
      move: {
        row: 1,
        column: 2
      }
    });
  });

  it('should not return the user\'s winning move', async function() {
    const board = [
      [Player.AI, Player.User, Player.AI],
      [Player.User, Player.User, Player.None],
      [Player.User, Player.AI, Player.None]
    ];

    await TestUtil.testRequestSuccess(this.testRequest, board, {
      winner: Player.None,
      move: {
        row: 2,
        column: 2
      }
    });
  });

  it('should return the winning move only if no other possible moves', async function() {
    const board = [
      [Player.AI, Player.User, Player.AI],
      [Player.User, Player.User, Player.AI],
      [Player.User, Player.AI, Player.None]
    ];

    await TestUtil.testRequestSuccess(this.testRequest, board, {
      winner: Player.AI,
      move: {
        row: 2,
        column: 2
      }
    });
  });

  it('should return the user\'s winning move only if no worst moves', async function() {
    const board = [
      [Player.None, Player.User, Player.AI],
      [Player.User, Player.User, Player.AI],
      [Player.User, Player.AI, Player.None]
    ];

    await TestUtil.testRequestSuccess(this.testRequest, board, {
      winner: Player.None,
      move: {
        row: 0,
        column: 0
      }
    });
  });
});