const moviesRoutes = require('express').Router();
const { createMovieValidator, deleteMovieValidator } = require('../validators/movies');
const {
  createMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movies');

/* Создаёт карточку */
moviesRoutes.post('/movies/', createMovieValidator, createMovie);

/* Удаляет карточку по идентификатору */
moviesRoutes.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

/* Получить сохраненные фильмы */
moviesRoutes.get('/movies', getMovies);

module.exports = moviesRoutes;
