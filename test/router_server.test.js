//Подключаем dev-dependencies
let chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should();
let expect = require('chai').expect;

const boot = require('../server/server').boot,
      shutdown = require('../server/server').shutdown,
      port = require('../server/server').port,
      hostname = require('../server/server').hostname;

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

// Content-Type: text/plain
    it('Chai should return 400', (done) => {
      chai.request(boot)
          .get(hostname+':'+port)
          .end((err, res) => {
              res.should.have.status(400);
              res.text.should.be.eql('wrong header');
        done();
        });
      });

      it('should return 200', function (done) {
        chai.request(boot)
            .get(hostname+':'+port)
            .set('Content-Type', 'text/plain')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                // res.should.have.status(200);
                res.text.should.be.eql('correct header');
          done();
          });
      });

      it('it should give test result', (done) => {
          chai.request(boot)
              .get(hostname+':'+port)
              .set('Content-Type', "application/json")
              .end((err, res) => {
                  // console.log(err); // outputs null
                  // console.log(res); // outputs normal-looking response
                  console.log(res.body) // { name: 'asad', class: 'paewe' }

                  let checkObj = {
                      name: 'asad',
                      class: 'paewe'
                  }
                  // res.body.should.be.eql(checkObj); // passes test

                  expect(res.body).to.deep.equal(checkObj);
                  done();
              });
      });
  });

// Content-Type: application/json

  afterEach( () => {
    shutdown();
  });

});
