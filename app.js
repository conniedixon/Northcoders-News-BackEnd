const express = require("express");
const app = express();
app.use(express.json());

const { apiRouter } = require("./routers/apiRouter.js");

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = { app };
