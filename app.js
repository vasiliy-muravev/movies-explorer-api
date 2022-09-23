const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const { PORT } = process.env;

const options = {
  origin: [
    'http://localhost:3011',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();
const usersRoutes = require('./routes/users');
const createUser = require('./routes/users');
const login = require('./routes/users');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

/* Разрешаем кросс-доменные запросы CORS */
app.use('*', cors(options));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
/* Логгер запросов winston */
app.use(requestLogger);
app.post('/signup', createUser);
app.post('/signin', login);
app.use('/users', usersRoutes);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
/* Логгер ошибок winston */
app.use(errorLogger);
/* Обработчик валидации от celebrate */
app.use(errors());
/* Кастомый обработчик ошибок */
app.use(error);

app.listen(PORT);
