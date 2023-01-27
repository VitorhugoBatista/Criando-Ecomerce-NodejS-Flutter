/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import cart from "../services/cartServices/cart.js";
import productById from "../services/productServices/productById.js";

class CartController {
  addItemToCart = async (req, res) => {
    const {
      productId,
    } = req.body;
    const quantity = Number.parseInt(req.body.quantity);
    try {
     cart();
      const productDetails = await productById(productId);
      if (!productDetails) {
        return res.status(500).json({
          type: 'Not Found',
          msg: 'Invalid request',
        });
      }
      // --If Cart Exists ----
      if (cart) {
      // ---- Check if index exists ----
        const indexFound = cart.items.findIndex((item) => item.productId.id === productId);
        // ------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
        if (indexFound !== -1 && quantity <= 0) {
          cart.items.splice(indexFound, 1);
          if (cart.items.length === 0) {
            cart.subTotal = 0;
          } else {
            cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
          }
        }
        // ----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
        else if (indexFound !== -1) {
          cart.items[indexFound].quantity += cart.items[indexFound].quantity + quantity;
          cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
          cart.items[indexFound].price = productDetails.price;
          cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
        }
        // ----Check if quantity is greater than 0 then add item to items array ----
        else if (quantity > 0) {
          cart.items.push({
            productId,
            quantity,
            price: productDetails.price,
            total: parseInt(productDetails.price * quantity),
          });
          cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
        }
        // ----If quantity of price is 0 throw the error -------
        else {
          return res.status(400).json({
            type: 'Invalid',
            msg: 'Invalid request',
          });
        }
        const data = await cart.save();
        res.status(200).json({
          type: 'success',
          mgs: 'Process successful',
          data,
        });
        // eslint-disable-next-line brace-style
      }
      // ------------ This creates a new cart and then adds the item to the cart that has been created------------
      else {
        const cartData = {
          items: [{
            productId,
            quantity,
            total: parseInt(productDetails.price * quantity),
            price: productDetails.price,
          }],
          subTotal: parseInt(productDetails.price * quantity),
        };
        cart = await cartRepository.addItem(cartData);
        // let data = await cart.save();
        res.json(cart);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        type: 'Invalid',
        msg: 'Something went wrong',
        err,
      });
    }
  };

  getCart = async (req, res) => {
    try {
      const cart = await cart();
      if (!cart) {
        return res.status(400).json({
          type: 'Invalid',
          msg: 'Cart not Found',
        });
      }
      res.status(200).json({
        status: true,
        data: cart,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        type: 'Invalid',
        msg: 'Something went wrong',
        err,
      });
    }
  };

  emptyCart = async (req, res) => {
    try {
      const cart = await cart();
      cart.items = [];
      cart.subTotal = 0;
      const data = await cart.save();
      res.status(200).json({
        type: 'success',
        mgs: 'Cart has been emptied',
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        type: 'Invalid',
        msg: 'Something went wrong',
        err,
      });
    }
  };
}

export default new CartController();
