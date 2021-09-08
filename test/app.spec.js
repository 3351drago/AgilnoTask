const supertest = require("supertest");
const assert = require('assert');
const app = require("../app");

describe("POST /", function() {
  it("it should has status code 200", function(done) {
    supertest(app)
      .post("/")
      .send({ "url": "http://agilno.com",
              "short_url": "/agn6"
            })
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe("GET /", function() {
  it("it should has status code 200 or 301", function(done) {
    supertest(app)
      .get("/agn")
      .expect(200 || 301)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});