
const fetchJSON = () => {
    const endpointsJSON = require("../endpoints.json");
    return endpointsJSON;
  };

module.exports = {fetchJSON}