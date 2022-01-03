import app from "../../index.js";

const show = function (req, res) {
  const concertId = parseInt(req.params.concertId, 10);
  req.query.limit = req.query.limit || 1000;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  app.connection.query(
    "SELECT * from songs where (concertId = ?)",
    [concertId],
    (error, rows, fields) => {
      if (error) throw error;
      console.log(concertId);
      //console.log(typeof rows[0].difficulty);
      let result = {
        code: 20000,
        message: "OK",
        result: rows.slice(0, limit),
      };
      res.json(result);
    }
  );
};

const create = function (req, res) {
  const concertId = req.body.concertId;
  const selectorName = req.body.selectorName;
  const singerName = req.body.singerName;
  const songName = req.body.songName;
  const remarks = req.body.remarks;
  const link = req.body.link;
  const difficulty = req.body.difficulty;
  const score = req.body.score;

  console.log(songName);

  if (!concertId || !selectorName || !singerName || !songName || !difficulty) {
    return res.status(400).end();
  }

  app.connection.query(
    "INSERT INTO songs (concertId, selectorName, singerName, songName, remarks, link, difficulty, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      concertId,
      selectorName,
      singerName,
      songName,
      remarks,
      link,
      difficulty,
      score,
    ],
    (error, rows, fields) => {
      if (error) throw error;
      let result = {
        code: 20000,
        message: "OK",
        result: rows.insertId,
      };
      res.status(201).json(result).end();
    }
  );
};

const del = function (req, res) {
  const songId = parseInt(req.params.songId, 10);
  if (Number.isNaN(songId)) {
    return res.status(400).end();
  }

  app.connection.query(
    "DELETE FROM songs WHERE (id = ?)",
    [songId],
    (error, rows, fields) => {
      if (error) throw error;
      let result = {
        code: 20400,
        message: "OK",
        result: true,
      };
      res.json(result).status(204).end();
    }
  );
};

const update = function (req, res) {
  //id가 정수가 아닐 때 400 리턴
  const songId = parseInt(req.params.songId, 10);
  if (Number.isNaN(songId)) {
    return res.status(400).end();
  }
  const singerName = req.body.singerName;
  const songName = req.body.songName;
  const remarks = req.body.remarks;
  const link = req.body.link;
  const difficulty = req.body.difficulty;
  const score = req.body.score;

  app.connection.query(
    "UPDATE songs SET singerName = ?, songName = ?, remarks = ?, link = ?, difficulty = ?, score = ? where id = ?",
    [singerName, songName, remarks, link, difficulty, score, songId],
    (error, rows, fields) => {
      if (error) throw error;
      let result = {
        code: 20000,
        message: "OK",
        result: true,
      };

      res.json(result).end();
    }
  );
};

export default { show, create, del, update };
