const serverless = require("serverless-http");
const express = require("express");
const app = express();
// const corsConfig = require("./src/config/cors");
const corsMiddleware = require("./src/config/cors");
// const logRequestsResponses = require("./src/middlewares/logsMiddleware");

const routes = require("./src/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsConfig));
app.use(corsMiddleware);
// app.use(logRequestsResponses);
app.use(routes);

module.exports.handler = serverless(app);
