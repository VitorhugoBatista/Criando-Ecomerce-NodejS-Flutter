/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
//* eslint-disable import/no-import-module-exports *
/* eslint-disable linebreak-style */
import { Router } from 'express';
import ProductController from '../controllers/productController.js';
import CartController from '../controllers/cartController.js';
import fetchProducts from '../services/productServices/productsApi.js';

const routes = Router();

//products routes//
routes.get('/', fetchProducts);
routes.get('/products', ProductController.getProducts);
routes.get('/products/:id', ProductController.getProductById);
routes.delete('/products/:id', ProductController.removeProduct);

//cart routes//

routes.post('/cart', CartController.addItemToCart);
routes.get('/cart', CartController.getCart);
routes.delete('/cart/empty-cart', CartController.emptyCart);

export default routes;
