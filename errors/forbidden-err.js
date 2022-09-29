const { ERROR_CODE_403 } = require('../constants/errorCode');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_403;
  }
}

module.exports = ForbiddenError;
