const express = require("express");
const mongoose = require("mongoose");

const contactsRouter = require("./contacts/contacts.route");

module.exports = class Server {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    this.initMiddleware();
    await this.initDataBase();
    this.initRoutes();
    this.initErrorsHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddleware() {
    this.app.use(express.json());
  }

  async initDataBase() {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  initRoutes() {
    this.app.use("/api/contacts", contactsRouter);
  }

  initErrorsHandling() {
    this.app.use((err, req, res, next) => {
      return res.status(err.status || 500).send(err.message);
    });
  }

  startListening() {
    const PORT = process.env.PORT;
    this.app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 8081");
    });
  }
};
