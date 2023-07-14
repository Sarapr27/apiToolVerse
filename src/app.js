const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require("cors");
const session=require('express-session')
const methodOverride=require('method-override')
require('./db.js');
const findUserMiddleware=require('./middlewares/find_user.js')
const { sessionConfig } = require('./Assets/configSession.js');



const path=require('path');
const viewsPath = path.join(__dirname, 'views');

const server = express();
server.set('views', viewsPath);
server.set('view engine', 'pug')
server.name = 'API';

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(methodOverride('_method'))
server.use(session(sessionConfig))
server.use(findUserMiddleware)
server.use(routes);

server.get('/',(req,res)=>{
  res.render('home',{user:req.user})
  //solo para pruebas luego se va eliminar
})


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
