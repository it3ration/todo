const chai = require("chai");
const server = require("../server");
const chaiHttp = require("chai-http");
const Todo = require("../Todo");
const { request } = require("chai");
const should = chai.should();
chai.use(chaiHttp);

describe("todo API", () => {
  describe("GET /todo", () => {
    it("It should GET all Todo's", (done) => {
      chai
        .request(server)
        .get("/todo")
        .end((err, res) => {
          res.should.have.a.status(200);
          res.body.should.be.a("array");
          res.body.length.should.eq(5);
          done();
        });
    });

    it("It shouldn't GET all Todo's", (done) => {
      chai
        .request(server)
        .get("todoo")
        .end((err, res) => {
          res.should.have.a.status(404);

          done();
        });
    });
  });

  describe("GET /todo - filtering the collection of todos by query params", () => {
    it("It should get all the todos that share the same completed value (object property)", (done) => {
      chai
        .request(server)
        .get("/todo/")
        .query({ completed: false })
        .end((err, res) => {
          res.should.have.a.status(200);
          res.body.should.be.a("array");
          res.body.length.should.eq(4);
          done();
        });
    });

    it("It should not get all todos that share the same query params value", () => {
      chai
        .request(server)
        .get("/todo/")
        .query({ completed: "" })
        .end((err, res) => {
          res.should.have.a.status(404);
        });
    });
  });

  describe("GET /todo by ID (query string)", () => {
    const itemID = 1;
    it("It should get a Todo by ID (query string)", (done) => {
      chai
        .request(server)
        .get("/todo/")
        .query({ id: itemID })
        .end((err, res) => {
          res.should.have.a.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it(`It shouldn't get a Todo by ID (query string)`, (done) => {
      chai
        .request(server)
        .get("/todo/id/blank")
        .query({ _id: itemID })
        .end((err, res) => {
          res.should.have.a.status(500);
          done();
        });
    });

    it("It should get a Todo by ID (params)", (done) => {
      chai
        .request(server)
        .get("/todo/" + itemID)
        .end((err, res) => {
          res.should.have.a.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("It shouldn't get a Todo by ID (params)", (done) => {
      chai
        .request(server)
        .get("/todo/id/" + itemID)
        .end((err, res) => {
          res.should.have.a.status(500);
          done();
        });
    });
  });

  describe("POST /todo", () => {
    const newTodo = new Todo(
      "Play guitar",
      "Practice diatonic chord progressions in all keys",
      false,
      365
    );
    it("It should post a Todo", (done) => {
      chai
        .request(server)
        .post("/todo/")
        .send(newTodo)
        .end((err, res) => {
          res.should.have.a.status(201);
          res.body.should.be.a("object");
          res.body.should.have.a.property("_id");
          res.body.should.have.a.property("task");
          res.body.should.have.a.property("isCompleted");
          res.body.should.have.a.property("frequency");
          done();
        });
    });

    it("It shouldnt post a Todo", (done) => {
      chai
        .request(server)
        .post("/todo/id")
        .send(newTodo)
        .end((err, res) => {
          res.should.have.a.status(500);
          done();
        });
    });
  });

  describe("PUT /todo", () => {
    const itemID = 1;
    it("It should update an item in the collection based on ID", (done) => {
      chai
        .request(server)
        .put("/todo/" + `${itemID}`)
        .send({
          task: "Play guitar",
          note: "Practice diatonic chord progressions in all keys",
          isCompleted: false,
          frequency: 365,
        })
        .end((err, res) => {
          res.should.have.a.status(202);
          res.body.should.be.a("object");

          done();
        });
    });

    it("It shouldnt update an item in the collection based on ID", (done) => {
      chai
        .request(server)
        .put("/todos/" + `${itemID}`)
        .send({
          task: "Play guitar",
          note: "Practice diatonic chord progressions in all keys",
          isCompleted: false,
          frequency: 365,
        })
        .end((err, res) => {
          res.should.have.a.status(500);
          res.body.should.be.a("object");

          done();
        });
    });

    describe("DELETE a todo in the collection", () => {
      const todoID = "1";
      it("IT should delete a todo based on ID", (done) => {
        chai
          .request(server)
          .delete("/todo/" + todoID)
          .end((err, res) => {
            res.should.be.a("object");
            res.should.have.a.status(200);
            done();
          });
      });

      it("It shouldnt deleted a todo based on ID", (done) => {
        chai
          .request(server)
          .delete("/todo/delete" + todoID)
          .end((err, res) => {
            res.should.have.a.status(404);
            done();
          });
      });
    });
  });
});
