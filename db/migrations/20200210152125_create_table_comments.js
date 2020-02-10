exports.up = function(knex) {
  console.log("Making the comments table...");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes").defaultTo(0);
    //created at
    commentsTable.string("body").notNullable();
  });
};

exports.down = function(knex) {
  console.log("Removing the comments table...");
  return knex.schema.dropTable("comments");
};
