/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import axios from 'axios';

import mongoose from 'mongoose';
import qs, { stringify } from 'qs';
import productById from '../services/productServices/productById.js';
import products from '../services/productServices/products.js';
import removeProduct from '../services/productServices/removeProduct.js';

mongoose.set('strictQuery', true);

class ProductController {
  getProducts = async (req, res) => {
    try {
      const responseBR = await axios.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider');
      const responseEU = await axios.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider');
      if (responseBR.status === 200 && responseEU.status === 200) {
        const EUProducts = (responseEU.data).map(product => {
          return {
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            productDescription: product.description,
            productMaterial: product.details.material,
            productAdjective: product.details.adjective,
            productImagepath: product.gallery[0],
            hasdisCount: product.hasDiscount,
            discountValue: product.discountValue,
            finalPrice: (product.price - product.discountValue * product.price),
            supplier: 'EUSupplier',
          };
        });
        const BRProducts = (responseBR.data).map(product => {
          return {
            productId: product.id,
            productName: product.nome,
            productPrice: product.preco,
            productDescription: product.descricao,
            productMaterial: product.material,
            productAdjective: product.departamento,
            productImagepath: product.imagem,
            hasdisCount: 'false',
            discountValue: '0',
            finalPrice: product.preco,
            supplier: 'BRSupplier',
          };
        });
        const listFinal = [...EUProducts, ...BRProducts];
        res.send(listFinal);
      }
    } catch (err) {
      res.send({ message: 'something goes wrong with products fetch' });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const productDetails = await productById(id);
      res.status(200).json({
        status: true,
        data: productDetails,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        error: err,
      });
    }
  };

  removeProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const productDetails = await removeProduct(id);
      res.status(200).json({
        status: true,
        data: productDetails,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        error: err,
      });
    }
  };
}

export default new ProductController();
