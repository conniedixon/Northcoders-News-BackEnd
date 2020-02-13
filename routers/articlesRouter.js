const express = require("express");
const articlesRouter = express.Router();

const {getArticleById}

articlesRouter.route("/:article_id").get(getArticleById);

module.exports = { articlesRouter };
