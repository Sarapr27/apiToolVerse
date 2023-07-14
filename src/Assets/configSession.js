require('dotenv').config();
const session=require('express-session')
const PgSession = require('connect-pg-simple')(session);

let sessionConfig = {
  secret: process.env.SECRET_SESSION,
  saveUninitialized: false,
  resave: false,
  store: new PgSession({
    conObject: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
  }),
  cookie: {
    maxAge: 2 * 60 * 60 * 1000 
  }
};

module.exports = {sessionConfig};