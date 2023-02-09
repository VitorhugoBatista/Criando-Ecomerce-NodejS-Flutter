import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  imagem: { type: String, required: true },
  preco: { type: Number, required: true },
  material: { type: String, required: true },
  departamento: { type: String, required: true },
  id: { type: Number, required: true },
});
const Product = mongoose.model('Product', productSchema);

export default Product;
