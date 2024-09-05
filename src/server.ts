import express from "express";
import cors from "cors";
import path from "node:path";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../swagger.json';
import UserRoutes from "./routes/UserRoutes";

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

  configRoutes() {
    this.app.use("/users", new UserRoutes().router);
    this.documentation();
  }

  configBodyParser() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.resolve("public", "imgs")));
  }

  documentation(){
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default Server;
