const boot = require('../bin/server').boot,
      shutdown = require('../bin/server').shutdown,
      port = require('../bin/server').port,
      hostname = require('../bin/server').hostname,
      superagent = require('superagent'),
      expect = require('chai').expect;

describe('should be run server', () => {

  beforeEach( () => {
      boot();
  });

  describe('should be open homepage', () => {
    it('should respond to GET',  (done) => {
      superagent
      .get(hostname+':'+port)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  afterEach( () => {
    shutdown();
  });

});
