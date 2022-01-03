// 테스트
import request from "supertest";
import should from "should";
import app from "../../index.js";

describe("GET /songs는", () => {
  describe("성공시", () => {
    it("...", (done) => {
      request(app.app)
        .get("/songs/1")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          console.log(res.body);
          done();
        });
    });

    it("최대 limit 갯수만큼 응답한다", (done) => {
      request(app.app)
        .get("/songs/2?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          console.log(res.body);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("limit이 숫자형이 아닌 400을 응답한다", (done) => {
      request(app.app).get("/songs/1?limit=two").expect(400).end(done);
    });
  });
});

describe("POST /concerts", () => {
  describe("성공시", () => {
    let difficulty = [0, 0, 0, 0, 0, 0, 0, 0, 0],
      body;
    before((done) => {
      request(app.app)
        .post("/songs")
        .send({
          concertId: 2,
          selectorName: "김대경",
          singerName: "악뮤",
          songName: "stupid love song",
          remarks: "노래좋음",
          link: "https://www.youtube.com/watch?v=kbhrPzqpVe8&t=63s",
          difficulty: difficulty, // List<int>[9],
          score: false,
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
      body.should.have.property("difficulty", difficulty);
    });
  });
  describe("실패시", () => {
    it("파라미터 누락시 400을 반환한다", (done) => {
      request(app.app).post("/songs").send({}).expect(400).end(done);
    });
  });
});

describe("DELETE /songs/:id는", () => {
  describe("성공시", () => {
    it("204를 응답한다", (done) => {
      request(app.app)
        .delete("/songs/1")
        .expect(204)
        .end((err, res) => {
          console.log(res.body);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐경우 400으로 응답한다", (done) => {
      request(app.app).delete("/songs/one").expect(400).end(done);
    });
  });
});

describe.only("PUT /songs/:id", () => {
  describe("성공시", () => {
    it("변경된 songs 정보를 반환한다", (done) => {
      let difficulty = [1, 0, 0, 1, 0, 0, 0, 0, 0];
      request(app.app)
        .put("/songs/2")
        .send({
          concertId: 2,
          selectorName: "김대경",
          singerName: "악뮤",
          songName: "stupid love song",
          remarks: "노래좋음",
          link: "https://www.youtube.com/watch?v=kbhrPzqpVe8&t=63s",
          difficulty: difficulty, // List<int>[9],
          score: false,
        })
        .end((err, res) => {
          res.body.should.have.property("difficulty", difficulty);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("정수가 아닌 id일 경우 400을 응답한다", (done) => {
      request(app.app).put("/songs/one").expect(400).end(done);
    });
    it("정보가 없을 경우 400을 응답한다", (done) => {
      request(app.app).put("/songs/1").send({}).expect(400).end(done);
    });
    it("없는 스케쥴일 경우 404를 응답한다", (done) => {
      request(app.app)
        .put("/songs/999")
        .send({
          concertId: 2,
          selectorName: "김대경",
          singerName: "악뮤",
          songName: "stupid love song",
          remarks: "노래좋음",
          link: "https://www.youtube.com/watch?v=kbhrPzqpVe8&t=63s",
          difficulty: [1, 0, 0, 1, 0, 0, 0, 0, 0], // List<int>[9],
          score: false,
        })
        .expect(404)
        .end(done);
    });
  });
});
