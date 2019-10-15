require('chai').should();
const guard = require('../src/index');

describe('Type Guard', () => {
  it('should be a function', ()=> guard.should.be.a('function'));

})