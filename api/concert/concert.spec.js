// 테스트
import request from "supertest";
import should from "should";
import app from "../../index.js";

describe("GET /concerts는", () => {
  describe("성공시", () => {
    it("...", (done) => {
      request(app.app)
        .get("/concerts")
        .end((err, res) => {
          res.body.should.be.instanceOf(Object);
          console.log(res.body.result);
          done();
        });
    });

    it("최대 limit 갯수만큼 응답한다", (done) => {
      request(app.app)
        .get("/concerts?limit=2")
        .end((err, res) => {
          res.body.result.should.have.lengthOf(2);
          console.log(res.body);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("limit이 숫자형이 아닌 400을 응답한다", (done) => {
      request(app.app).get("/concerts?limit=two").expect(400).end(done);
    });
  });
});

describe("POST /concerts", () => {
  describe("성공시", () => {
    let body;
    before((done) => {
      request(app.app)
        .post("/concerts")
        .send({ date: "2022-12-30", concertName: "2023 봄공연" })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("생성된 콘서트 객체를 반환한다", () => {
      body.should.have.property("result");
    });
  });
  describe("실패시", () => {
    it("파라미터 누락시 400을 반환한다", (done) => {
      request(app.app).post("/concerts").send({}).expect(400).end(done);
    });
  });
});

describe("DELETE /concerts/:id는", () => {
  describe("성공시", () => {
    it("204를 응답한다", (done) => {
      request(app.app)
        .delete("/concerts/1")
        .expect(204)
        .end((err, res) => {
          console.log(res.body);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐경우 400으로 응답한다", (done) => {
      request(app.app).delete("/concerts/one").expect(400).end(done);
    });
  });
});
