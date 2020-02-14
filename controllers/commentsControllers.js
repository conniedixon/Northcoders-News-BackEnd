const { fetchVotes, fetchDeleteComment } = require("../models/commentsModels");

const incrementVotes = (req, res, next) => {
  const params = req.params;
  const body = req.body;
  fetchVotes(params, body)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

const deleteComment = (req, res, next) => {
  const params = req.params;
  fetchDeleteComment(params)
    .then(status => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = { incrementVotes, deleteComment };
