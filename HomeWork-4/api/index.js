const path = require("path");
require = require("esm")(module);
const { AuthServer } = require("./server");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

new AuthServer().start();
