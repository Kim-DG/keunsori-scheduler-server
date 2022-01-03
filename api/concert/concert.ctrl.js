//api 로직
import app from "../../index.js";

const show = function (req, res) {
  req.query.limit = req.query.limit || 1000;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  app.connection.query("SELECT * from concerts", (error, rows, fields) => {
    if (error) throw error;
    let result = {
      code: 20000,
      message: "OK",
      result: rows.slice(0, limit),
    };
    res.json(result);
  });
};

const create = function (req, res) {
  console.log(req.body);
  const date = req.body.date;
  const concertName = req.body.concertName;
  console.log(date);
  console.log(concertName);

  if (!date || !concertName) return res.status(400).end();

  app.connection.query(
    "INSERT INTO concerts (date, concertName) VALUES (?, ?)",
    [req.body.date, req.body.concertName],
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
  const concertId = parseInt(req.params.concertId, 10);
  if (Number.isNaN(concertId)) {
    return res.status(400).end();
  }
  app.connection.query(
    "DELETE FROM concerts WHERE (id = ?)",
    [concertId],
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

export default { show, create, del };
