const express = require("express");
const commentsRouter = express.Router();

const {
  incrementVotes,
  deleteComment
} = require("../controllers/commentsControllers");

commentsRouter
  .route("/:comment_id")
  .patch(incrementVotes)
  .delete(deleteComment)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Invalid method" });
  });

module.exports = { commentsRouter };
