import { Line, Move, Player } from '../common/types';
import Board from '../common/board';
import RandomUtil from '../server/util/random-util';
import { expect } from 'chai';
import server from '../server/server';
import * as request from 'supertest';

export default class TestUtil {

  public static CATS_GAME_RAW = [
    [Player.User, Player.AI, Player.AI],
    [Player.AI, Player.User, Player.User],
    [Player.User, Player.User, Player.AI]
  ];

  public static CATS_GAME = new Board(TestUtil.CATS_GAME_RAW);

  public static EMPTY_LINE = [ Player.None, Player.None, Player.None ];

  public static POSSIBLE_SQUARE_VALUES = [ Player.None, Player.AI, Player.User ];

  public static getRandomMove(): Move {
    return {
      row: RandomUtil.getRandomInt(3),
      column: RandomUtil.getRandomInt(3)
    };
  }

  public static getRandomBoard(): Board {
    return new Board(TestUtil.getRandomBoardRaw());
  }

  public static getRandomBoardRaw(): Line[] {
    const board = [[], [], []];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        board[row][col] = RandomUtil.chooseRandomElement(TestUtil.POSSIBLE_SQUARE_VALUES);
      }
    }
    return board;
  }

  /**
   * For any tests that include random elements,
   * run the test 100 times the number of possible outcomes,
   * then check that each re
   * @param fn the function we are testing (including any assertions)
   * @param numPossibleOutcomes how many outcomes from fn() are possible
   */
  public static assertRandomEquitableDistribution(fn, numPossibleOutcomes) {
    const resultMap = new Map<string, number>();
    const multiplier = 1000;
    const iterations = numPossibleOutcomes * multiplier;
    for (let i = 0; i < iterations; i++) {
      const result = fn();
      const resultHash = JSON.stringify(result);
      const count = resultMap.get(resultHash) || 0;
      // Stringify the value, so that objects can be compared successfully
      resultMap.set(resultHash, count + 1);
    }

    // Check that each possible result is returned approximately the same number
    // of times. The delta here may need to be played with to avoid false test failures,
    // or increase the multiplier above to increase the number iterations for increased accuracy
    const delta = multiplier / 5; // Allow 5% margin of error
    expect(resultMap.size).to.eql(numPossibleOutcomes);
    resultMap.forEach((count) => {
      expect(count).to.be.closeTo(multiplier, delta);
    });
  }

  /**
   * A utility method to run a function 100 times. This is
   * useful for functions that have a random result, so we can
   * have a higher certainty that the test is accurate
   * @param fn
   * @param iterations
   * @returns {Promise<void>}
   */
  public static async testAsyncManyTimes(fn, iterations) {
    for (let i = 0; i < iterations; i++) {
      await fn();
    }
  }

  /**
   * Get a supertest request for the app & given route
   * @param {string} route
   * @returns {any}
   */
  public static getTestRequest(route: string) {
    return request(server.app)
        .post(route)
        .set('Content-Type', 'application/json');
  }

  /**
   * Test that the supertest request was successful for the given payload and returned the
   * given response
   * @param testRequest
   * @param payload
   * @param expectedResponse
   * @returns {Promise<void>}
   */
  public static async testRequestSuccess(testRequest, payload, expectedResponse) {
    await testRequest.send(payload)
        .expect(200, expectedResponse)
        .expect('Content-Type', /json/);
  }
}