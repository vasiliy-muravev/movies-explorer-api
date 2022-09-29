const { ERROR_CODE_404 } = require('../constants/errorCode');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_404;
  }
}

module.exports = NotFoundError;
