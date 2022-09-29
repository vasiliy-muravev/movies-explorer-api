const { ERROR_CODE_409 } = require('../constants/errorCode');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_409;
  }
}

module.exports = ConflictError;
