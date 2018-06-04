// list of all the properties binded to Global Scope
const path = require('path');

// function to bind project root directory for requiring modules.
global.rootRequire = function(name) {
  const module = require(path.join(__dirname, name)); // eslint-disable-line
  return module;
};

// wrapper for stdout stderr for well informed logging
global.logger = require('./config/logger');
global._ = require('lodash');

global.PROJECT_ROOT_DIRECTORY = path.resolve(__dirname);