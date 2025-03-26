const { authenticate } = require("../controllers/auth-controller");
const { createTransaction, webhook, successfullyPaid, failedPaid } = require("../controllers/transaction-controller");
const transactionSchema = require("../schemas/transaction-schema");
const responseSchema = require("../schemas/response-schema");

async function transactionRoutes(fastify, options) {
  fastify.post("/create-transaction", { 
    preHandler: authenticate, 
    schema: transactionSchema 
  }, 
    createTransaction
  );

  fastify.post("/webhook", {schema: responseSchema}, webhook);
  fastify.get('/webhook/success', successfullyPaid);
  fastify.get('/webhook/fail', failedPaid);
}

module.exports = transactionRoutes;