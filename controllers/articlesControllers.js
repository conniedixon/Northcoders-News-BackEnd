const { fetchArticleById } = require("../models/articleModels.js");

const getArticleById = (req, res, next) => {
  const query = req.params;
  fetchArticleById(query)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getArticleById };
