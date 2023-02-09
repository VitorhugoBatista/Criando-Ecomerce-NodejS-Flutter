import Cart from '../../models/cart.js';

class CartRepository {
  cart = async () => {
    const carts = await Cart.find().populate({
      path: 'items.productId',
      select: 'name price total',
    });
    return carts[0];
  };

  addItem = async (payload) => {
    const newItem = await Cart.create(payload);
    return newItem;
  };
}

export default new CartRepository();