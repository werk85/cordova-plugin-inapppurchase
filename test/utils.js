import { utils } from '../www/index-ios';
import assert from 'assert';

describe('utils', () => {
  describe('#chunk', () => {
    it('should chunk a given array', () => {
      const chunks = utils.chunk(['1', '2', '3', '4', '5'], 2);
      assert.deepEqual(chunks, [['1', '2'], ['3', '4'], ['5']]);
    });

    it('should return on chunk when the size is bigger than the array size', () => {
      const chunks = utils.chunk(['1', '2', '3', '4', '5'], 42);
      assert.deepEqual(chunks, [['1', '2', '3', '4', '5']]);
    });

    it('should throw an error on size smaller 1', () => {
      assert.throws(() => {
        utils.chunk(['1', '2', '3', '4', '5'], 0);
      }, (err) => {
        return err.message === 'Invalid size';
      }, 'unexpected error');
    });

    it('should throw an error on non numeric size', () => {
      assert.throws(() => {
        utils.chunk(['1', '2', '3', '4', '5'], 'not a number');
      }, (err) => {
        return err.message === 'Invalid size';
      }, 'unexpected error');
    });

    it('should throw an error when on a non array type', () => {
      assert.throws(() => {
        utils.chunk(null, 2);
      }, (err) => {
        return err.message === 'Invalid array';
      }, 'unexpected error');
    });
  });

  describe('validArrayOfStrings', () => {
    it('should return true on a valid non-empty string array', () => {
      assert(utils.validArrayOfStrings(['product1']) === true);
      assert(utils.validArrayOfStrings(['product1', 'product2']) === true);
    });

    it('should return false on a invalid non-empty string array', () => {
      assert(utils.validArrayOfStrings([]) === false);
      assert(utils.validArrayOfStrings(['']) === false);
      assert(utils.validArrayOfStrings([null]) === false);
      assert(utils.validArrayOfStrings([undefined]) === false);
      assert(utils.validArrayOfStrings(['product1', null]) === false);
      assert(utils.validArrayOfStrings(['product1', '']) === false);
      assert(utils.validArrayOfStrings(null) === false);
      assert(utils.validArrayOfStrings() === false);
      assert(utils.validArrayOfStrings(false) === false);
      assert(utils.validArrayOfStrings('product1') === false);
      assert(utils.validArrayOfStrings(123) === false);
    });
  });

  describe('validString', () => {
    it('should return true on a valid non-empty string', () => {
      assert(utils.validString('abc') === true);
    });

    it('should return false on anyting else', () => {
      assert(utils.validString() === false);
      assert(utils.validString(null) === false);
      assert(utils.validString('') === false);
      assert(utils.validString(123) === false);
      assert(utils.validString(true) === false);
      assert(utils.validString([]) === false);
      assert(utils.validString({}) === false);
    });
  });
});
