const request = require("supertest");
const app = require("../app");
const models = require("../models");

describe("Positive Test /api/history", () => {
  test("/POST create new history", (done) => {
    request(app)
      .post("/api/history")
      .send({
        user_id: 1,
        score: 100,
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("History added successfully");
        done();
      });
  });

  test("/GET get all history", (done) => {
    request(app)
      .get("/api/history")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Success get all history");
        done();
      });
  });

  test("/GET get history by id", (done) => {
    request(app)
      .get("/api/history/1")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Success get history by id");
        done();
      });
  });

  test("/PUT update history by id", (done) => {
    request(app)
      .put("/api/history/1")
      .send({
        user_id: 1,
        score: 100,
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Success update history");
        done();
      });
  });

  test("/DELETE delete history by id", (done) => {
    request(app)
      .delete("/api/history/1")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Success delete history");
        done();
      });
  });
});

describe("Negative Test /api/history", () => {
  test("/POST create new history empty user_id", (done) => {
    request(app)
      .post("/api/history")
      .send({
        user_id: "",
        score: 100,
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("user_id is required");
        done();
      });
  });

  test("/POST create new history empty score", (done) => {
    request(app)
      .post("/api/history")
      .send({
        user_id: 1,
        score: "",
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("score is required");
        done();
      });
  });

  test("/POST user_id is not number", (done) => {
    request(app)
      .post("/api/history")
      .send({
        user_id: "a",
        score: 100,
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("user_id must be number");
        done();
      });
  });

  test("/POST score is not number", (done) => {
    request(app)
      .post("/api/history")
      .send({
        user_id: 1,
        score: "a",
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("score must be number");
        done();
      });
  });

  test("/GET get history by id not found", (done) => {
    request(app)
      .get("/api/history/100")
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("History not found");
        done();
      });
  });
});

afterAll(() => models.sequelize.close());
