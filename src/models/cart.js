import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.'],
  },
  price: {
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
