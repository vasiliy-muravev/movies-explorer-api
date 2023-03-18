const { ERROR_CODE_401 } = require('../constants/errorCode');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_401;
  }
}

module.exports = UnauthorizedError;
