const express = require("express");
const topicsRouter = express.Router();
const { getTopics } = require("../controllers/topicsControllers.js");

topicsRouter.get("/", getTopics);

module.exports = { topicsRouter };
