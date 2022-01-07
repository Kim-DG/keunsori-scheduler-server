// 테스트
import request from "supertest";
import should from "should";
import app from "../../index.js";

describe("GET /selected-songs/:concertId", () => {
  describe("성공시", () => {
    it("...", (done) => {
      request(app)
        .get("/selected-songs/2")
        .end((err, res) => {
          res.body.should.be.instanceOf(Object);
          console.log(res.body);
          done();
        });
    });

    it("최대 limit 갯수만큼 응답한다", (done) => {
      request(app)
        .get("/selected-songs/2?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          console.log(res.body);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("limit이 숫자형이 아닌 400을 응답한다", (done) => {
      request(app).get("/selected-songs/1?limit=two").expect(400).end(done);
    });
  });
});

describe("POST /selected-songs", () => {
  describe("성공시", () => {
    body;
    before((done) => {
      request(app)
        .post("/selected-songs")
        .send({
          concertId: 2,
          selectorName: "김대경",
          singerName: "악뮤",
          songName: "stupid love song",
        })
        .expect(201)
        .end((err, res) => {
          console.log(res.body);
          body = res.body;
          done();
        });
    });
    it("생성된 콘서트 객체를 반환한다", () => {
      body.should.have.property("id");
    });
    it("입력한 concert 정보를 반환한다", () => {
      body.should.have.property("concertId", 2);
    });
  });
  describe("실패시", () => {
    it("파라미터 누락시 400을 반환한다", (done) => {
      request(app).post("/selected-songs").send({}).expect(400).end(done);
    });
  });
});

describe("DELETE /selected-songs/:selected_songId", () => {
  describe("성공시", () => {
    it("204를 응답한다", (done) => {
      request(app)
        .delete("/selected-songs/1")
        .expect(204)
        .end((err, res) => {
          console.log(res.body);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐경우 400으로 응답한다", (done) => {
      request(app).delete("/selected-songs/one").expect(400).end(done);
    });
  });
});

describe.only("PUT /selected-songs/:selected_songId", () => {
  describe("성공시", () => {
    it("변경된 songs 정보를 반환한다", (done) => {
      request(app)
        .put("/selected-songs/2")
        .send({
          sequence: 5,
        })
        .end((err, res) => {
          res.body.should.have.property("concertId", 2);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("정수가 아닌 id일 경우 400을 응답한다", (done) => {
      request(app).put("/selected-songs/one").expect(400).end(done);
    });
    it("정보가 없을 경우 400을 응답한다", (done) => {
      request(app).put("/selected-songs/1").send({}).expect(400).end(done);
    });
    it("없는 스케쥴일 경우 404를 응답한다", (done) => {
      request(app)
        .put("/selected-songs/999")
        .send({
          concertId: 2,
          selectorName: "김대경",
          singerName: "악뮤",
          songName: "stupid love song",
        })
        .expect(404)
        .end(done);
    });
  });
});
