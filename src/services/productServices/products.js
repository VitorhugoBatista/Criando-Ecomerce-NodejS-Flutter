/* eslint-disable linebreak-style */
import Product from '../../models/product.js';

export default async function products() {
  const product = await Product.find();
  return product;
}
