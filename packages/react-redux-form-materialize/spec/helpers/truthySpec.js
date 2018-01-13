import chai from 'chai';

import getTruthyProps from '../../src/helpers/truthyProps';

const { expect } = chai;

describe('Truthy helper', () => {
  it('should return an array', () => {
    const obj = {
      truthy: true,
    };
    const result = getTruthyProps(obj);
    expect(result).to.be.an('array');
  });
  it('should return an array with only truthy values', () => {
    const obj = {
      truthy: true,
      truthy1: '1',
      falsy: false,
      falsy0: 0,
    };
    const result = getTruthyProps(obj);
    expect(result).to.deep.equal([true, '1']);
  });
});
