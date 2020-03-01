const ENV = process.env.NODE_ENV || "development";

const devPath = require("./development-data");
const testPath = require("./test-data");

const data = {
  development: devPath,
  test: testPath,
};

data.production = data.development;

module.exports = data[ENV];
