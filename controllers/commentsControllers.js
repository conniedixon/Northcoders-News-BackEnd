const { fetchVotes, fetchDeleteComment } = require("../models/commentsModels");

const incrementVotes = (req, res, next) => {
  const { comment_id } = req.params
  const {inc_votes} = req.body;
  if (inc_votes && isNaN(Number(inc_votes))){
    next({ status: 400, msg: "Bad Request" })}
  fetchVotes(comment_id, inc_votes)
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
