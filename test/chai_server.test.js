//Подключаем dev-dependencies
let chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should();

const boot = require('../bin/server').boot,
      shutdown = require('../bin/server').shutdown,
      port = require('../bin/server').port,
      hostname = require('../bin/server').hostname;

chai.use(chaiHttp);

//Наш основной блок

describe('Chai should be run server', () => {

  beforeEach( () => { //Перед каждым тестом
      boot();
  });

  /*
    * Тест для /GET
  */

  describe('Chai should be open homepage', () => {
    it('Chai should respond to GET',  (done) => {
        chai.request(boot)
            .get(hostname+':'+port)
            .end((err, res) => {
                res.should.have.status(200);
            done();
            });
      });
  });

  afterEach( () => {
    shutdown();
  });

});
