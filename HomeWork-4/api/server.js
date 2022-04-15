import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import { authRouter } from "./auth/auth.router";

export class AuthServer {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    this.initMiddleware();
    await this.initDataBase();
    this.initRoutes();
    this.initErrorsHandler();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddleware() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
  }

  async initDataBase() {
    await mongoose.connect(process.env.MONGODB_URL);
  }

  initRoutes() {
    this.app.use("/auth", authRouter);
  }

  initErrorsHandler() {
    this.app.use((err, req, res, next) => {
      return res.status(err.status || 500).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;
    this.app.listen(PORT, () => {
      console.log("SERVER START ON PORT --->", PORT);
    });
  }
}
