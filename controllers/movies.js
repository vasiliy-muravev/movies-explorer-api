const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner: req.user._id,
    nameRU,
    nameEN
  })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные для создания карточки ${error.message}`));
      } else {
        next(error);
      }
    });
};
