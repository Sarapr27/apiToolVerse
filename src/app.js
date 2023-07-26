const express = require('express');
const routes = require('./routes/index.js');
require('./db.js');
const cors = require("cors");
const server = express();
server.name = 'API';

const corsOptions = {
  origin: 'http://localhost:3000', //esta url se debe cambia a la de deploy del front cuando no se este trabajando localmente ('https://clienttoolverse-production.up.railway.app')
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(routes);



// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;