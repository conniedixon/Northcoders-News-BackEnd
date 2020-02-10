const devPath = require("./development-data");
const testPath = require("./test-data");

const data = {
  development: devPath,
  test: testPath
};

module.exports = data[ENV];
