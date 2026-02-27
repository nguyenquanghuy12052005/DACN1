import express from 'express';
import mongoose from 'mongoose';
import { Route } from './core/interface';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { Logger } from './core/utils';
import { errorMiddleware } from './core/middleware';
import { createServer } from 'http';
import SocketService from "./core/socket/socket";
import { AppDataSource, initializeDatabase } from './core/database/postgreSQL';
import { connectMongoDB } from './core/database/mongoDB';

class App {
  public app: express.Application;
  public port: string | number;
  public production: boolean;
  private server: any;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.production = process.env.NODE_ENV === "production";

    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorMiddleware();
  }

  public listen() {
    this.server = createServer(this.app);
    SocketService.initialize(this.server);
    this.server.listen(this.port, () => {
      Logger.info(`Server running at http://localhost:${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use(route.path as string, route.router);
    });
  }

  private initializeMiddleware() {
    if (this.production) {
      this.app.use(hpp());  
      this.app.use(helmet());
      this.app.use(morgan('combined'));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else {
      this.app.use(morgan('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeErrorMiddleware() {
    this.app.use(errorMiddleware);
  }

private async connectToDatabase() {
try {
  await AppDataSource.initialize();
  Logger.info("PostgreSQL connected successfully!");
} catch (error) {
  Logger.error("Failed to initialize PostgreSQL connection", error);
}

try {
  await connectMongoDB();    
} catch (error) {
  Logger.error("Failed to connect to MongoDB", error);
    
}
}


}

export default App;