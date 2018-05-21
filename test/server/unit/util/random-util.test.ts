/* tslint:disable only-arrow-functions */
/* tslint:disable no-invalid-this */
import { expect } from 'chai';
import RandomUtil from '../../../../server/util/random-util';
import TestUtil from '../../../test-util';

describe('RandomUtil', function() {
  describe('chooseRandomElement', function() {
    it('should return nothing if sent an empty array', function() {
        expect(RandomUtil.chooseRandomElement([])).to.be.undefined;
    });

    it('should return a random element', function() {
      const arr = [1, 2, 3, 4];
      TestUtil.assertRandomEquitableDistribution(() => {
        const result = RandomUtil.chooseRandomElement(arr);
        expect(result).to.be.within(1, 4);
        return result;
      }, arr.length);
    });
  });

  describe('getRandomBool', function() {
    it('should return a random boolean', function() {
      TestUtil.assertRandomEquitableDistribution(() => {
        const result = RandomUtil.getRandomBool();
        expect(typeof result).to.eql('boolean');
        return result;
      }, 2);
    });
  });

  describe('getRandomInt', function() {
    it('should return a random integer less than exclusive max', function() {
      TestUtil.assertRandomEquitableDistribution(() => {
        const result = RandomUtil.getRandomInt(5);
        expect(result).to.be.within(0, 4);
        return result;
      }, 5);
    });
  });
});