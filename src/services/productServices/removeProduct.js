/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
import Product from "../../models/product.js";

export default async function removeProduct(id) {
  const product = await Product.findByIdAndRemove(id);
  return product;
}
