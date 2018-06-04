const { QueryBuilder } = rootRequire('utils');
const { getPaginationColumnList, getFilterColumnList } = rootRequire('helpers').footballer;

async function logic({ query }) {
  try {
    const { mysql } = rootRequire('db');
    const columns = getPaginationColumnList();
    const filterColumns = getFilterColumnList();
    const qb = new QueryBuilder({ buildTotalQuery: true });
    qb.select(columns)
      .selectTotal('count(*) AS count')
      .from('footballers f')
      .where();

    // list of filter applicable as per the query object
    if (query.ball_control) qb.and().gte(filterColumns.ball_control, query.ball_control);
    if (query.dribbling) qb.and().gte(filterColumns.dribbling, query.dribbling);
    if (query.marking) qb.and().gte(filterColumns.marking, query.marking);
    if (query.sliding_tackle) qb.and().gte(filterColumns.sliding_Tackle, query.sliding_tackle);
    if (query.standing_tackle) qb.and().gte(filterColumns.standing_Tackle, query.standing_tackle);
    if (query.shot_power) qb.and().gte(filterColumns.shot_power, query.shot_power);
    if (query.finishing) qb.and().gte(filterColumns.finishing, query.finishing);
    if (query.freekick_accuracy) qb.and().gte(filterColumns.freekick_accuracy, query.freekick_accuracy);

    // search params
    if (query.search) {
      // qb.and().open()
      qb.and().like(columns.name, query.search);
      // qb.close();
    }

    // sort-by and sort-order
    qb.orderBy(columns[query.sort] || columns.rating);

    qb.order(query.sortOrder || 'DESC');
    qb.limit(+query.limit || 10);
    qb.page(query.page);
    const result = await qb.paginateQuery(mysql);
    return result;
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