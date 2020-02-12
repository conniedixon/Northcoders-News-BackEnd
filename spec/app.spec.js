const { expect } = require("chai");
const request = require("supertest");
const { app } = require("../app");

describe("APP/API:", () => {
  describe("/TOPICS:", () => {
    describe("GET", () => {
      it("Status 200: returns an array of topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.be.an("array");
          });
      });
    });
  });
});
