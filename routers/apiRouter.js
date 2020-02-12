const express = require("express");
const apiRouter = express.Router();

const { topicsRouter } = require("./topicsRouter");

const topicsRouter = apiRouter.use("/topics", topicsRouter);

module.exports = { apiRouter };
