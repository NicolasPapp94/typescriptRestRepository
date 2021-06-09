import express, { Application } from 'express';
import cors from "cors";


import router from '../routes/user.routes';
import db from '../database/connection';
class Server {

  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('../public'));
  }


  routes() {
    this.app.use(this.apiPaths.users, router);
  }

  async connectDB() {
    try {
      await db.authenticate();
      console.log("Database online");

    } catch (error) {
      throw new Error(error);
    }
  }

  listening() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);

    })
  }
}

export default Server;


