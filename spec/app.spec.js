const { expect } = require("chai");
const request = require("supertest");
const { app } = require("../app");

describe("APP/API:", () => {
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
            .get("/api/users/jessjelly")
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
});
