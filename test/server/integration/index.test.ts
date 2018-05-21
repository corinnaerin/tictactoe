/* tslint:disable only-arrow-functions */
import server from '../../../server/server';
import * as request from 'supertest';

const app = server.app;

/**
 * Tests general processing & error handling of the API
 */
describe('API', function() {

  it('should return a 400 when sent an invalid board', function() {
    return testFailureWithPayload([[1], [2], [3]], 'Invalid board: must be a 3x3 2-dimensional array containing only -1, 1, or 2');
  });

  it('should return a 400 when sent invalid json', function() {
    // Testing that we get the more descriptive message for invalid json
    return testFailureWithPayload('{ test', 'Unexpected token t in JSON at position 2');
  });

  function testFailureWithPayload(payload?, errorMessage?) {
    return request(app)
        .post('/api/move/hard')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /text/)
        .expect(400, errorMessage);
  }
});