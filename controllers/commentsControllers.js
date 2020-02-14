const { fetchVotes } = require("../models/commentsModels");

const incrementVotes = (req, res, next) => {
  const params = req.params;
  const body = req.body;
  console.log(params, body, "<---params and body");
  fetchVotes(params, body)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = { incrementVotes };
