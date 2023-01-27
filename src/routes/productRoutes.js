/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
//* eslint-disable import/no-import-module-exports *
/* eslint-disable linebreak-style */
import { Router } from 'express';
import ProductController from '../controllers/productController.js';

const routes = Router();

routes.get('/products', ProductController.getProducts);
routes.get('products/:id', ProductController.getProductById);
routes.delete('products/:id', ProductController.removeProduct);
export default routes;
