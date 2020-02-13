const express = require("express");
const articleIdRouter = express.Router();

const {
  getArticleById,
  incrementArticleVotes,
  getAllComments
} = require("../controllers/articlesControllers.js");

articleIdRouter
  .get("/", getArticleById)
  .patch("/", incrementArticleVotes)
  .get("/comments", getAllComments)
  // .route("/")
  // .get(getArticleById)
  // .patch(incrementArticleVotes)
  // .route("/comments")
  // .get(getAllComments)
  .all(
    (invalidMethod = (req, res, next) => {
      res.status(405).send({ msg: "Invalid method" });
    })
  );

module.exports = { articleIdRouter };
