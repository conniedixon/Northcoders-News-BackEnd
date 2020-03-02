const express = require("express");
const app = express();
const cors = require('cors')

const { apiRouter } = require("./routers/apiRouter.js");

app.use("/api", apiRouter)
app.use(express.json());
app.use(cors())
app.options('*', cors())

app.use("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") res.status(400).send({ msg: "Bad Request" });
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else res.status(500).send({ msg: "Internal server error" , err});
});

module.exports = app;
