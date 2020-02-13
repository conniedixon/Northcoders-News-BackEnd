const express = require("express");
const articlesRouter = express.Router();

const { getArticleById } = require("../controllers/articlesControllers.js");

articlesRouter.route("/:article_id").get(getArticleById);

module.exports = { articlesRouter };
