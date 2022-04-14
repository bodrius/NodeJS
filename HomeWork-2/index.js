const app = require("./app");
require("dotenv").config();

app.listen(process.env.PORT || 8080, () => {
  console.log("Server running. Use our API on port: 8080");
});
