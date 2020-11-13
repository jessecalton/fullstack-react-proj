// keys.js - which set of credentials to use - prod or dev?

if (process.env.NODE_ENV === 'production') {
  // we are in prod
  module.exports = require('./prod');
} else {
  // we are in development
  module.exports = require('./dev');
}
