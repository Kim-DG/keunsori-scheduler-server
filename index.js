//express 설정
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import concert from "./api/concert/index.js";
import schedule from "./api/schedule/index.js";
import song from "./api/song/index.js";
import selected_song from "./api/selected_song/index.js";
import mysql from "mysql";

let app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//concert router
app.use("/concerts", concert);
app.use("/schedules", schedule);
app.use("/songs", song);
app.use("/selected-songs", selected_song);

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "keunsori",
});

connection.connect();
var serverPort = 8080;
//express 구동
app.listen(process.env.PORT || serverPort, function () {
  console.log("Example app listening on port 3000!");
});

export default { app, connection };
