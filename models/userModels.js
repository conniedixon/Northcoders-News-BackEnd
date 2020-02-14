const knex = require("../db/connection");

const fetchUser = query => {
  const { username } = query;
  return knex("users")
    .first("*")
    .where({ username })
    .then(user => {
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: `No user found for username: ${username}`
        });
      }
      return user;
    });
};

module.exports = { fetchUser };
