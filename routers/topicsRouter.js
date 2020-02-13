const express = require("express");
const topicsRouter = express.Router();
const { getTopics } = require("../controllers/topicsControllers.js");

topicsRouter.route("/").get(getTopics);

module.exports = { topicsRouter };
