const nconf = require('nconf');
const path = require('path');

function Config() {
  nconf.argv().env();
  let environment = nconf.get('NODE_ENV') || 'development';
  
  nconf.file({file: path.join(__dirname, './' + environment.toLowerCase() + '.json')});
  // nconf.file('default', './default.json');
}
Config.prototype.get = (key) => {
  return nconf.get(key);
};

module.exports = new Config();