const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const { PORT } = process.env;

const options = {
  origin: [
    'http://localhost:3010',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();
console.log('работает');

mongoose.connect('mongodb://127.0.0.1:27017/moviedb');

/* Разрешаем кросс-доменные запросы CORS */
app.use('*', cors(options));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});


app.listen(PORT);
