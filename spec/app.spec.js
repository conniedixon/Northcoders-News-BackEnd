process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");
const { app } = require("../app");
const connection = require("../db/connection");

describe("APP/API:", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  it("Status 404: Path not found", () => {
    return request(app)
      .get("/invalid")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.eql("Path not found");
      });
  });
  describe("/TOPICS:", () => {
    describe("GET", () => {
      it("Status 200: returns an array of topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            expect(topics).to.be.an("array");
            expect(topics[0]).to.contain.keys("slug", "description");
          });
      });
      it("Status 404: Path not found", () => {
        return request(app)
          .get("/api/topix")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Path not found");
          });
      });
    });
  });
  describe("/USERS", () => {
    describe("/:username", () => {
      describe("GET", () => {
        it("Status 200: returns a user object with relevant keys", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user[0]).to.be.an("object");
              expect(user[0]).to.contain.keys("username", "avatar_url", "name");
            });
        });
        it("Status 404: Custom message user {username} not found", () => {
          return request(app)
            .get("/api/users/jessyjellie")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.eql("No user found for username: jessyjellie");
            });
        });
      });
    });
  });
  describe("/ARTICLES", () => {
    describe("/:article_id", () => {
      describe("GET", () => {
        it("Status 200: Returns an object with relevant keys", () => {
          return request(app)
            .get("/api/articles/2")
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article[0]).to.be.an("object");
              expect(article[0]).to.contain.keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes"
              );
            });
        });
        it("Status 200: Returns a comment count column", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article[0]).to.contain.keys("comment_count");
              expect(article[0].comment_count).to.eql("13");
            });
        });
        it("Status 404: Returns custom message no article found for id {id}", () => {
          return request(app)
            .get("/api/articles/10697")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.eql("No article found for id 10697");
            });
        });
      });
      describe("PATCH", () => {
        it("Status 200: Responds with an object with relevant values and increments ", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article[0].votes).to.eql(1);
            });
        });
        it("Status 404: Custom message, path not found", () => {
          return request(app)
            .patch("/api/articles/10697")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.eql("No article found for id 10697");
            });
        });
        it("Status 405: Invalid Method", () => {
          const invalidMethods = ["post", "put", "delete"];
          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]("/api/articles/1")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Invalid method");
              });
          });
          return Promise.all(methodPromises);
        });
      });
      describe("/comments", () => {
        describe("GET", () => {
          it("Status 200: returns an array of comments", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.an("array");
                expect(comments[0]).to.contain.keys(
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                );
              });
          });
          it("Status 404: Path not found", () => {
            return request(app)
              .get("/api/700000/comments")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Path not found");
              });
          });
        });
        describe.only("POST", () => {
          it("Status 201: Responds with created comment", () => {
            return request(app)
              .post("/api/articles/3/comments")
              .send({
                username: "butter_bridge",
                body: "I love posting comments"
              })
              .expect(201)
              .then(({ body: { postedComment } }) => {
                expect(postedComment[0]).to.be.an("object");
                expect(postedComment[0].body).to.eql("I love posting comments");
              });
          });
          it("Status 400: Bad Request", () => {
            return request(app)
              .post("/api/articles/notAnArticle/comments")
              .send({
                username: "butter_bridge",
                body: "I love posting comments"
              })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Bad Request");
              });
          });
          it("Status 405: Invalid Method", () => {
            const invalidMethods = ["put", "delete"];
            const methodPromises = invalidMethods.map(method => {
              return request(app)
                [method]("/api/articles/1/comments")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Invalid method");
                });
            });
            return Promise.all(methodPromises);
          });
        });
      });
    });
  });
});
