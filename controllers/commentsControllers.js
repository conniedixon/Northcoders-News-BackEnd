const { fetchVotes, fetchDeleteComment } = require("../models/commentsModels");

const incrementVotes = (req, res, next) => {
  const {inc_votes} = req.body;

  if (inc_votes && isNaN(Number(inc_votes))){
    next({ status: 400, msg: "Bad Request" })}
        fetchVotes(req.params, req.body)
          .then(comment => {
            res.status(200).send({ comment });
          })
          .catch(err => {
            next(err);
          });
};

const deleteComment = (req, res, next) => {
  const {comment_id} = req.params;
  fetchDeleteComment(comment_id)
    .then(status => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { incrementVotes, deleteComment };
