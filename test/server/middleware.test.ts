/* tslint:disable only-arrow-functions */
import server from '../../server/server';
import * as request from 'supertest';

const app = server.app;

/**
 * Tests both error-handler and validate-board middleware, end-to-end
 */
describe('API middleware', function() {
  it('should return a 400 when sent an empty payload', function() {
    return testWithPayload();
  });

  it('should return a 400 when sent an empty array', function() {
    return testWithPayload([]);
  });

  it('should return a 400 when sent an empty object', function() {
    return testWithPayload({});
  });

  it('should return a 400 when sent a 1-dimensional array', function() {
    return testWithPayload([1, 2, 3]);
  });

  it('should return a 400 when sent a 2-dimensional array of the wrong length', function() {
    return testWithPayload([[1], [2], [3]]);
  });

  it('should return a 400 when sent invalid json', function() {
    // Testing that we get the more descriptive message for invalid json
    return testWithPayload('{ test', 'Unexpected token t in JSON at position 2');
  });

  function testWithPayload(payload?, errorMessage?) {
    return request(app)
        .post('/api/winner')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /text/)
        .expect(400, errorMessage || 'Payload must be a 3x3 2-dimensional array');
  }
});