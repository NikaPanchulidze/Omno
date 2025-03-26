const fastify = require("fastify")({ logger: false });
const swagger = require('@fastify/swagger');
const swaggerUi = require('@fastify/swagger-ui');

const transactionRoutes = require("./routes/transaction-router");
const { CustomError } = require("./errors");

fastify.register(swagger, {
  swagger: {
    info: {
      title: 'OMNO',
      description: 'API documentation for transactions app.',
      version: '1.0.0',
    },
  },
});

fastify.register(swaggerUi, {
  routePrefix: '/documentation',
});

fastify.register(transactionRoutes);

fastify.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: error.message,
      validation: error.validation 
    });
  } else if (error instanceof CustomError) {
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message
    });
  } else {
    fastify.log.error(error);  
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred'
    });
  }
});


module.exports = fastify;