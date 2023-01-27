/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
import Product from '../../models/product.js';

export default async function productById(id) {
  const product = await Product.findById(id);
  return product;
}
