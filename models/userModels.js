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

const checkUserExists = user => {
  return knex("users")
    .select("*")
    .modify(query => {
      if (username) query.where("username", user);
    })
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({ status: 404, msg: `user ${user} not found` });
      }
    });
};

module.exports = { fetchUser, checkUserExists };
