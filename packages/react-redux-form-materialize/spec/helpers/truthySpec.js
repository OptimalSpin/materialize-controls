import chai from 'chai';
import chaiGenerator from 'chai-generator';

import getTruthyProps from '../../src/helpers/truthyProps';

chai.use(chaiGenerator);
const { expect } = chai;

describe('Truthy helper', () => {
  it('should return an iterator', () => {
    const obj = {
      truthy: true,
    };
    const result = getTruthyProps(obj);
    expect(result).to.deep.yield(['truthy', true]);
  });
  it('should return an iterator with only truthy values', () => {
    const obj = {
      truthy: true,
      truthy1: '1',
      falsy: false,
      falsy0: 0,
    };
    const result = getTruthyProps(obj);
    expect(result).to.deep.yield(['truthy', true]);
    expect(result).to.deep.yield(['truthy1', '1']);
    expect(result).to.return(undefined);
  });
});
