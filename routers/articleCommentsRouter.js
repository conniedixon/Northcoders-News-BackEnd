const express = require("express");
const articleCommentsRouter = express.Router();
const { getAllComments } = require("../controllers/commentControllers");

articleCommentsRouter.route("/").get(getAllComments);

module.exports = { articleCommentsRouter };
