import { errorResponse } from '../utils/apiResponse.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    return errorResponse(res, `Resource not found with id of ${err.value}`, 404);
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return errorResponse(res, 'Validation Error', 400, messages);
  }

  if (err.code === 11000) {
    return errorResponse(res, 'Duplicate field value entered', 400);
  }

  return errorResponse(res, message, statusCode);
};

export default errorHandler;
