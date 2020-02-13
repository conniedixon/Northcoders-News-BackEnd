const { fetchAllComments } = require("../models/commentsModels");

getAllComments = (req, res, next) => {
  console.log(req);
  const query = req.query;
  fetchAllComments(query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = { getAllComments };
