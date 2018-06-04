const path = require('path');
/**
 *
 * This is the main entry point of the application.
 * It will load configurations, initialize the app and start the express server
 */

require('dotenv').config({ path: path.join(__dirname, '/.env') });

// Set globals
require('./globals');

// Initaializing Database Connection
const { getClient } = require('./db').mysql;

getClient();

// Running the required scripts
/** Script to make sure necessary untracked folders exists */
const { createFolders } = require('./scripts');

createFolders.init(['log']);

// Start server
const { appServer } = require('./web/server');

require('./gracefullyShutDown')(appServer);