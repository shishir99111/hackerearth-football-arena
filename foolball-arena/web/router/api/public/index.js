/**
 * Mounts component specific routes,
 * along with there respective route handlers
 * @param {object} router
 */

module.exports = (router) => {
  router.get('/ping', (req, res) => {
    res.status(200).send('pong');
  });
};