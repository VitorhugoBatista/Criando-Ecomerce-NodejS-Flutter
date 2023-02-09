/* eslint-disable brace-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */

import productById from '../services/productServices/productById.js';
import cartRepository from '../services/cartServices/cart.js';

class CartController {
  addItemToCart = async (req, res) => {
    const {
      productId,
    } = req.body;
    const quantity = Number.parseInt(req.body.quantity, 10);
    try {
      let cart = await cartRepository.cart();
      const productDetails = await productById(productId);
      console.log(productDetails);
      if (!productDetails) {
        return res.status(500).json({
          type: 'Not Found',
          msg: 'Invalid request',
        });
      }
      // --If Cart Exists ----
      if (cart) {
        console.log(cart);
        // ---- Check if index exists ----
        const indexFound = cart.items.findIndex((item) => item.productId.id == productId);
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
          // eslint-disable-next-line operator-assignment
          cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
          cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.preco;
          cart.items[indexFound].preco = productDetails.preco;
          cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
        }
        // ----Check if quantity is greater than 0 then add item to items array ----
        else if (quantity > 0) {
          cart.items.push({
            productId,
            quantity,
            preco: productDetails.preco,
            total: parseInt(productDetails.price * quantity, 10),
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
      }
      // ------------ This creates a new cart and then adds the item to the cart that has been created------------
      else {
        const cartData = {
          items: [{
            productId,
            quantity,
            total: parseInt(productDetails.preco * quantity, 10),
            preco: productDetails.preco,
          }],
          subTotal: parseInt(productDetails.preco * quantity, 10),
        };
        cart = await cartRepository.addItem(cartData);
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
      const cart = await cartRepository.cart();
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
      const cart = await cartRepository.cart();
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
