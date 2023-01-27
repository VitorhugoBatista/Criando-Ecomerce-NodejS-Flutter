import express from 'express';

const router = express.Router();

const Order = require('../src/models/order');
const Cart = require('../src/models/cart');
const { stripeSecretKey } = require('../../config/env');

router.get('/checkout', isLoggedIn, (req, res, next) => {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  const cart = new Cart(req.session.cart);
  const errMsg = req.flash('error')[0];
  return res.render('shop/checkout', { total: cart.totalPrice, errMsg, noError: !errMsg });
});

router.post('/checkout', (req, res, next) => {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  const cart = new Cart(req.session.cart);

  const stripe = require('../.env')(stripeSecretKey);

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: 'usd',
    source: req.body.stripeToken, // obtained with Stripe.js
    description: 'Test Charge',
  }, (err, charge) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    const order = new Order({
      user: req.user,
      cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id,
    });
    order.save((err, result) => {
      req.flash('success', 'Successfully bought product!');
      req.session.cart = null;
      res.redirect('/');
    });
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  return res.redirect('/user/signin');
}

module.exports = router;
