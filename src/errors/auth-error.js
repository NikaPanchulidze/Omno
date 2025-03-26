const CustomError = require("./custom-error");

class AuthError extends CustomError {
  constructor(message = 'Could not authenticate') {
    super(message, 401);
    Object.setPrototypeOf(this, AuthError.prototype)
  }
}

module.exports = AuthError;