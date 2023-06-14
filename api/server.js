const express = require("express");
const useRouter = require("../api/users/users-router");
const server = express();
const { logger } = require("./middleware/middleware");

server.use(express.json());
server.use(logger);

// posts router'ını buraya require edin ve bağlayın

server.use("/api/users", useRouter);
server.get("/", (req, res) => {
  res.send("Server is up and running!...");
});

module.exports = server;
