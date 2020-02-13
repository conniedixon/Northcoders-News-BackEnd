const express = require("express");
const usersRouter = express.Router();
const { getUser } = require("../controllers/usersControllers");

usersRouter.get("/:username", getUser);

module.exports = { usersRouter };
