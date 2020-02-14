const express = require("express");
const commentsRouter = express.Router();

const { incrementVotes } = require("../controllers/commentsControllers");

commentsRouter.patch("/:comment_id", incrementVotes).all(
  (invalidMethod = (req, res, next) => {
    res.status(405).send({ msg: "Invalid method" });
  })
);

module.exports = { commentsRouter };
