const express = require("express");
const apiRouter = express.Router();

const { topicsRouter } = require("./topicsRouter.js");
const { usersRouter } = require("./usersRouter.js");
const { articlesRouter } = require("./articlesRouter.js");
const { commentsRouter } = require("./commentsRouter.js");
const { getEndpoints } = require("../controllers/apiControllers");

apiRouter.route("/").get(getEndpoints);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = { apiRouter };
