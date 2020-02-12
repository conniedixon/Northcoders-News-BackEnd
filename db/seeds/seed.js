const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("topics")
        .insert(topicData)
        .returning("*");
      const usersInsertions = knex("users")
        .insert(userData)
        .returning("*");

      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const updatedArticleData = formatDates(articleData);
      return knex("articles")
        .insert(updatedArticleData)
        .returning("*");
    })
    .then(articleRows => {
      let formattedCommentData = formatDates(commentData);
      let referenceObj = makeRefObj(articleRows);
      formattedCommentData = formatComments(formattedCommentData, referenceObj);
      return knex("comments")
        .insert(formattedCommentData)
        .returning("*");
    });
};
