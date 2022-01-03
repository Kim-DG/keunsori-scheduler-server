import app from "../../index.js";

const show = function (req, res) {
  const concertId = parseInt(req.params.concertId, 10);
  req.query.limit = req.query.limit || 1000;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  app.connection.query(
    "SELECT * FROM selectedSongs where (concertId = ?) ORDER BY sequence ASC",
    [concertId],
    (error, rows, fields) => {
      if (error) throw error;
      console.log(concertId);
      console.log(rows);
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

  if (!concertId || !selectorName || !singerName || !songName) {
    return res.status(400).end();
  }

  app.connection.query(
    "SELECT MAX(sequence) AS max FROM selectedSongs",
    (error, rows, fields) => {
      if (error) throw error;

      app.connection.query(
        "INSERT INTO selectedSongs (concertId, selectorName, singerName, songName, sequence) VALUES (?, ?, ?, ?, ?)",
        [concertId, selectorName, singerName, songName, rows[0]["max"] + 1],
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
    }
  );
};

const del = function (req, res) {
  const songId = parseInt(req.params.selected_songId, 10);
  if (Number.isNaN(songId)) {
    return res.status(400).end();
  }
  app.connection.query(
    "DELETE FROM selectedSongs WHERE (id = ?)",
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
  const songId = parseInt(req.params.selected_songId, 10);
  const sequence = req.body.sequence;

  app.connection.query(
    "UPDATE selectedSongs SET sequence = ? where id = ?",
    [sequence, songId],
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
