const { fetchUser } = require("../models/userModels");

const getUser = (req, res, next) => {
  const query = req.params;
  fetchUser(query)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getUser };
