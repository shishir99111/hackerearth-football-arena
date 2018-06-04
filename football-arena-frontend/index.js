const express = require('express')
const app = express();
const http = require('http').Server(app);
const path = require('path');
const request = require('request');
var cors = require('cors');

require('dotenv').config({ path: path.join(__dirname, '/.env') });

const PORT = 5550;
const INDEX_PATH = path.join(__dirname, 'public/index.html');

global.logger = require('./middleware').logger;

app.use(express.static(path.join(__dirname, process.env.SERVED_RESOURCE_PATH)));

app.use(cors());

app.use((req, res, next) => {
  logger.info(`--> ${req.method} ${req.path}`);
  next();
});

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

app.all('/api/v1/*', async(req, res, next) => {
  const options = { method: req.method };
  options.uri = process.env.API_BASE_URL + req.url;
  req.pipe(request(options)).pipe(res);
});

app.get(['/*'], (req, res) => {
  res.sendFile(path.join(__dirname, INDEX_PATH));
});

http.listen(PORT, () => {
  logger.info(`listening on PORT ${PORT}, ${process.env.NODE_ENV} ENVIRONMENT.`);
});

require('./gracefullyShutDown')(http); // eslint-disable-line global-requir