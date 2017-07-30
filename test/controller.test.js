var expect = require('chai').expect; // importing library to create the test
var addOp = require('../controllers/operations.js').addOp; // importing the function that we are going to evaluate

describe('Math', function(){
  // Parent declaration test
  describe('#add function', function(){
    // Child declaration test
    it('should returns the result number from the two arguments', function(){
      // Test defination
      var result = addOp(1, 2); // Invoking the function created for us
      expect(result).to.equal(3); // And we expect thet result will be 3
      });
    });
});
