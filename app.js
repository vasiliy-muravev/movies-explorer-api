const mongoose = require('mongoose');
const app = require('./routes/index');
const { DB_ADDRESS_CONST } = require('./constants/config');
require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  DB_NAME,
  DB_ADDRESS,
} = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS + DB_NAME : `${DB_ADDRESS_CONST}moviesdb`);

app.listen(NODE_ENV === 'production' ? PORT : 3001);
