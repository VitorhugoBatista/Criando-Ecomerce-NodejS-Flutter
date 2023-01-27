import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
// eslint-disable-next-line import/extensions
import routes from './src/routes/productRoutes.js';

// Crindo uma classe para trabalhar com apenas uma instancia do server
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.json());
    this.server.use(bodyParser.json());
    this.server.use(morgan('dev'));
  }
}

export default new App().server;
