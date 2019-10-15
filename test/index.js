const should = require('chai').should();
const guard = require('../src/index');

describe('Type Guard', () => {
  it('should be a function', ()=> guard.should.be.a('function'));
  
  it('should do nothing if no types passed in', () => {
    should.not.throw(() => guard('fish'));
    should.not.throw(() => guard('robot', []));
  });
  
  it('should validate types', () => {
    should.not.throw(() => guard('taco', 'string'));
    should.not.throw(() => guard('taco', ['string']));
    
    should.not.throw(() => guard(1234, 'number'));
    should.not.throw(() => guard(1234, ['number']));

    should.throw(() => guard('1234', 'number'));
  });
  
  it('should validate instances');
});