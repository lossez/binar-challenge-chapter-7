const request = require("supertest");
const app = require("../app");
const models = require("../models");

describe("Positive Test /api/usergame", () => {
  test("/POST create new usergame", (done) => {
    request(app)
      .post("/api/usergame")
      .send({
        username: "user2",
        password: "123456",
        user_game_biodata: {
          first_name: "user2",
          last_name: "user2",
          email: "user2@email.com",
          umur: "20",
          gender: "male",
        },
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("user sucessfully created");
        done();
      });
  });

  test("/GET get all usergame", (done) => {
    request(app)
      .get("/api/usergame")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Success get all user");
        done();
      });
  });

  test("/GET get usergame by id", (done) => {
    request(app)
      .get("/api/usergame/1")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Success get user by id");
        done();
      });
  });

  test("/PUT update usergame by id", (done) => {
    request(app)
      .put("/api/usergame/2")
      .send({
        password: "1234567",
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("sucessfully update user");
        done();
      });
  });

  test("/DELETE delete usergame by id", (done) => {
    request(app)
      .delete("/api/usergame/2")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("successful operation");
        done();
      });
  });
});

describe("Negative Test /api/usergame", () => {
  test("/POST create new usergame empty username", (done) => {
    request(app)
      .post("/api/usergame")
      .send({
        username: "",
        password: "123456",
      })
      .then((res) => {
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("username and password is required");
        done();
      });
  });

  test("/POST create new usergame empty password", (done) => {
    request(app)
      .post("/api/usergame")
      .send({
        username: "user1",
        password: "",
      })
      .then((res) => {
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("username and password is required");
        done();
      });
  });

  test("/POST create new usergame password less than 6", (done) => {
    request(app)
      .post("/api/usergame")
      .send({
        username: "user1",
        password: "123",
      })
      .then((res) => {
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("password must be at least 6 characters");
        done();
      });
  });

  test("/POST username already exist", (done) => {
    request(app)
      .post("/api/usergame")
      .send({
        username: "user1",
        password: "123456",
      })
      .then((res) => {
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("username already exist");
        done();
      });
  });

  test("/GET get usergame by id not found", (done) => {
    request(app)
      .get("/api/usergame/100")
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("user id not found");
        done();
      });
  });
});

afterAll(() => models.sequelize.close());
