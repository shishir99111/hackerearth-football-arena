const mysql = require('mysql');

const pool = mysql.createPool({
  user: process.env.MYSQLUSER,
  host: process.env.MYSQLHOST,
  database: process.env.MYSQLDATABASE,
  password: process.env.MYSQLPASSWORD,
  // port: process.env.MYSQLPORT,
  connectionLimit: process.env.MYSQLMAXCONNECTION,
  waitForConnections: true,
  queueLimit: 10,
});

pool.on('connection', () => {
  logger.info('MySql connection establised');
});

pool.on('release', (connection) => {
  logger.info('MySql connection released');
});

/**
 * @param  {string} text
 * @param  {array} params
 */
function query(text, params) {
  if (process.env.NODE_ENV === 'production') {
    logger.info(text);
    logger.info(params);
  }

  return new Promise((resolve, reject) => {
    pool.query(text, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/** Use this for transactional integrity */
async function getClient() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      logger.info('MySql connection created');
      resolve(connection);
    });
  }).catch(e => {
    throw e;
  });
}

module.exports = {
  pool,
  query,
  getClient,
};