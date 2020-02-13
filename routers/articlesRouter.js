const express = require("express");
const articlesRouter = express.Router();

const { articleIdRouter } = require("./articleIdRouter");

articlesRouter.use("/:article_id", articleIdRouter);

module.exports = { articlesRouter };
