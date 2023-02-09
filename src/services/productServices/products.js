/* eslint-disable linebreak-style */
// eslint-disable-next-line import/extensions
import Product from '../../models/product.js';

export default async function products() {
  const product = await Product.find();
  return product;
}
