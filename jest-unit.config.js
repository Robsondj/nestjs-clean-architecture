const config = require('./jest.config');
config.testPathIgnorePatterns = ['/node_modules/', '/src/test/'];
module.exports = config;
