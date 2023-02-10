/* eslint-disable import/no-duplicates */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-duplicates
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ItemSchema = new Schema({
  Orderid: {
    type: mongoose.Schema.Types.ObjectId,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.'],
  },
  preco: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});
const CartSchema = new Schema({
  items: [ItemSchema],
  subTotal: {
    default: 0,
    type: Number,
  },
}, {
  timestamps: true,
});

export default mongoose.model('cart', CartSchema);
