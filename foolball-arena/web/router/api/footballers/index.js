const getPaginatedHandler = require('./getPaginated.handler');
const getRecordById = require('./getRecordById.handler');

/**
 * Mounts component specific routes,
 * along with there respective route handlers
 * @param {object} router
 */
module.exports = (router) => {
  router.get('/footballers', getPaginatedHandler);
  router.get('/footballer/:name', getRecordById);
};