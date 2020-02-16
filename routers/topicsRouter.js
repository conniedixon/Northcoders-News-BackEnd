const express = require("express");
const topicsRouter = express.Router();
const { getTopics } = require("../controllers/topicsControllers.js");

topicsRouter
  .route("/")
  .get(getTopics)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Invalid method" });
  });

module.exports = { topicsRouter };
