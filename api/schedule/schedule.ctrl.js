import app from "../../index.js";

const show = function (req, res) {
  const concertId = parseInt(req.params.concertId, 10);
  req.query.limit = req.query.limit || 1000;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  app.connection.query(
    "SELECT * from schedules  where (concertId = ?)",
    [concertId],
    (error, rows, fields) => {
      if (error) throw error;
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
  const date = req.body.date;
  const content = req.body.content;

  if (!concertId || !date || !content) return res.status(400).end();

  app.connection.query(
    "INSERT INTO schedules (concertId, date, content) VALUES (?, ?, ?)",
    [req.body.concertId, req.body.date, req.body.content],
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
  const scheduleId = parseInt(req.params.scheduleId, 10);
  if (Number.isNaN(scheduleId)) {
    return res.status(400).end();
  }
  app.connection.query(
    "DELETE FROM schedules WHERE (id = ?)",
    [scheduleId],
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
