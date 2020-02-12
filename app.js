const express = require("express");
const app = express();
app.use(express.json());

const { apiRouter } = require("./routers/apiRouter.js");

app.use("/api", apiRouter);
