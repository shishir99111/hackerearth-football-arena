const winston = require('winston');

winston.emitErrs = true;

let formatter = function(options) {
  return `${options.timestamp()} ${options.level.toUpperCase()} ${options.message} ${(options.meta && Object.keys(options.meta).length ? '\n' + JSON.stringify(options.meta) : '')}`;
};

if (process.env.NODE_ENV === 'development') {
  formatter = function(options) {
    return `${options.level.toUpperCase()} ${options.message} ${(options.meta && Object.keys(options.meta).length ? '\n' + JSON.stringify(options.meta) : '')}`;
  };
}

const logger = new winston.Logger({

  transports: [
    new winston.transports.Console({
      timestamp: function() {
        return (new Date()).toISOString();
      },
      formatter,
      level: process.env.LOGGER_LEVEL || 'info',
      handleExceptions: false,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;

module.exports.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};