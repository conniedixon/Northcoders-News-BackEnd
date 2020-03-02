const {fetchJSON} = require("../models/apiModels")

getEndpoints = (req, res, next) => {
    const endpoints = fetchJSON();
    res.status(200).send({ endpoints });
      };



module.exports = {getEndpoints}