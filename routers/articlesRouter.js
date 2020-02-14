const express = require("express");
const articlesRouter = express.Router();

const { articleIdRouter } = require("./articleIdRouter");
const { getAllComments } = require("../controllers/articlesControllers");

articlesRouter.use("/:article_id", articleIdRouter);

articlesRouter.get("/:article_id/comments", getAllComments);

module.exports = { articlesRouter };
