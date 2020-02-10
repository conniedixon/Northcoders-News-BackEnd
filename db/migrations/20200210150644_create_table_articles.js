exports.up = function(knex) {
  console.log("Making the articles table...");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title").notNullable();
    articlesTable.string("body").notNullable();
    articlesTable.integer("votes").defaultTo(0);
  });
};

exports.down = function(knex) {
  console.log("Removing the articles table...");
  return knex.schema.dropTable("articles");
};
