import express from "express";
import cors from "cors";
import path from "node:path";

class Server {
  public app = express();

  constructor() {
    this.configServer();
    this.configRoutes();
  }

  configServer() {
    this.configBodyParser();
    this.configCors();
  }

  configCors() {
    this.app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  }

  configRoutes() {}

  configBodyParser() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.resolve('public', 'imgs')));
  }
};

export default Server;
