/* eslint-disable linebreak-style */
// eslint-disable-next-line import/extensions
import Cart from '../../models/cart.js';

class CartRepository {
  // eslint-disable-next-line class-methods-use-this
  cart = async () => {
    const carts = await Cart.find().populate({
      path: 'items.productId',
      select: 'name price total',
    });
    return carts[0];
  };

  // eslint-disable-next-line class-methods-use-this
  addItem = async (payload) => {
    const newItem = await Cart.create(payload);
    return newItem;
  };
}

export default new CartRepository();