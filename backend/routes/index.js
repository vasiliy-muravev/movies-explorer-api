const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const error = require('../middlewares/error');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const NotFoundError = require('../errors/not-found-err');

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://192.168.0.105:3000',
    'http://vasiliymuravev.nomorepartiesxyz.ru',
    'https://vasiliymuravev.nomorepartiesxyz.ru',
    'http://vasiliy-muravev.github.io/movies-explorer-frontend',
    'https://vasiliy-muravev.github.io/movies-explorer-frontend',
    'http://movies.vasiliymuravev.ru',
    'https://movies.vasiliymuravev.ru',
    'http://localhost:3021',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/* Число запросов с одного IP в единицу времени ограничено */
app.use(limiter);
/* Модуль Helmet для установки заголовков, связанных с безопасностью */
app.use(helmet());
/* Разрешаем кросс-доменные запросы CORS */
app.use('*', cors(options));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
/* Логгер запросов winston */
app.use(requestLogger);
app.use(authRoutes);
app.use(auth);
app.use(usersRoutes);
app.use(moviesRoutes);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
app.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});
/* Логгер ошибок winston */
app.use(errorLogger);
/* Обработчик валидации от celebrate */
app.use(errors());
/* Кастомый обработчик ошибок */
app.use(error);

module.exports = app;
