const fastify = require('./app');
const dotenv = require("dotenv");

process.on("uncaughtException", err => {
  console.log("UNCOUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1)
});

dotenv.config({ path: "./config.env" });

// Server setup
const startServer = async () => {
  // ATTENTION! If you run docker host must be '0.0.0.0'
  // fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  fastify.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
    if (err) throw err;
    console.log(`Server running at ${address}`);
  });
};

startServer();

process.on("unhandledRejection", err => {
  console.log("UNHANDLER REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

