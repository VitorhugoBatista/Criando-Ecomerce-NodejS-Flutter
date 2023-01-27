import Cart from "../../models/cart.js";

 async function cart() {
  const carts = await Cart.find().populate({
    path: 'items.productId',
    select: 'name price total',
  });
  return carts[0];
};
export default cart

exports.addItem = async (payload) => {
  const newItem = await Cart.create(payload);
  return newItem;
};
