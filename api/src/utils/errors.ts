const errors = Object.freeze({
  notFound: Object.freeze({
    statusCode: 404,
    status: 'error'
  }),
  notModified: Object.freeze({
    statusCode: 304,
    status: 'error'
  }),
  unauthorized: Object.freeze({
    statusCode: 401,
    status: 'error'
  }),
  forbidden: Object.freeze({
    statusCode: 403,
    status: 'error'
  }),
  conflict: Object.freeze({
    statusCode: 409,
    status: 'error'
  }),
  failDependency: Object.freeze({
    statusCode: 424,
    status: 'error'
  }),
  server: Object.freeze({
    statusCode: 500,
    status: 'error'
  })
});

module.exports = {
  errors
};
