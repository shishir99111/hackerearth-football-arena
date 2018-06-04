const { requestLogger, authorization, sanitizeRequestObj } = require('../middleware');
const router = require('express').Router();

// logging request info
requestLogger(router);

sanitizeRequestObj(router);

/** Open routes */
require('./api/public')(router);

// require('./api/authentication')(router);

// authorization(router);

/** Secured routes */
require('./api/footballers')(router);

/**
 * Mounting respective paths.
 * @param {object} app Express instance
 */
module.exports = (app) => {
  app.use('/api/v1', router);
};