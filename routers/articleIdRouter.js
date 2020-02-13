const express = require("express");
const articleIdRouter = express.Router();

const {
  getArticleById,
  incrementArticleVotes
} = require("../controllers/articlesControllers.js");

articleIdRouter
  .route("/")
  .get(getArticleById)
  .patch(incrementArticleVotes)
  .all(
    (invalidMethod = (req, res, next) => {
      res.status(405).send({ msg: "Invalid method" });
    })
  );

module.exports = { articleIdRouter };
