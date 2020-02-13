const express = require("express");
const articlesRouter = express.Router();

const {
  getArticleById,
  incrementArticleVotes
} = require("../controllers/articlesControllers.js");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(incrementArticleVotes)
  .all(
    (invalidMethod = (req, res, next) => {
      res.status(405).send({ msg: "Invalid method" });
    })
  );
module.exports = { articlesRouter };
