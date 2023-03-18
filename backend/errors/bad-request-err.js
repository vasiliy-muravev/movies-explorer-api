const { ERROR_CODE_400 } = require('../constants/errorCode');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_400;
  }
}

module.exports = BadRequestError;
