const knex = require("../db/connection");

const fetchVotes = ({comment_id}, {inc_votes = 0}) => {
  console.log(inc_votes, '<----')
  return knex("comments")
    .select("*")
    .where({ comment_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(response => {
      if (response.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No comments found for id ${comment_id}`
        });
      }
      return response[0];
    });
};

const fetchDeleteComment = params => {
  const { comment_id } = params;
  return knex("comments")
    .where({ comment_id })
    .del().then(response=>{
      if (response === 0) {
        return Promise.reject({
          status: 405,
          msg: `No comments found for id ${comment_id}`
        });
      }
    })
};

module.exports = { fetchVotes, fetchDeleteComment };
