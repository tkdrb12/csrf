class RequestError extends Error {
  errorMessage;
  errorCode;

  constructor(errorMessage = '', errorCode = 500) {
    super();

    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }
}

const requestErrorHandler = (callback, res) => {
  try {
    callback();
  } catch (error) {
    return res.status(error.errorCode).json({
      errorCode: errorCode.errorCode,
      errorMessage: error.errorMessage,
    });
  }
};

module.exports = {
  RequestError,
  requestErrorHandler,
};
