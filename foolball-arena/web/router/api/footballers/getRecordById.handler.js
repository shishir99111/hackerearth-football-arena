const Boom = require('boom');

const { getFootballerByName } = rootRequire('helpers').footballer;

async function logic({ params }) {
  try {
    if (!params.name) Boom.badRequest('please provide the name');

    const footballer = await getFootballerByName(params.name);

    if (!footballer || footballer.length === 0) Boom.badRequest('No player exist with this Name');

    return footballer[0];
  } catch (e) {
    throw e;
  }
}

function handler(req, res, next) {
  logic(req).then((data) => {
    res.json(data);
  }).catch(err => next(err));
}
module.exports = handler;