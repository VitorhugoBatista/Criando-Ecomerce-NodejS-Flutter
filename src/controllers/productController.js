/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable import/extensions */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

// eslint-disable-next-line import/no-cycle
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-cycle
import fetchProducts from '../services/productServices/fetchProducts.js';


mongoose.set('strictQuery', true);

class ProductController {
  getProducts = async (req, res) => {
    try {
      const produtos = await fetchProducts;
      res.status(200).json(produtos);
    } catch (err) {
      res.send({ err });
    }
  };

  getProductById = async (req, res) => {
    try {
    const listfinal = await fetchProducts;
      const { id } = req.params;
      const filteredProducts = listfinal.filter(product => product.productId === id);
      console.log(filteredProducts);
      res.status(200).json(
        filteredProducts,
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'not finded',
        error: err,
      });
    }
  };

  getProductByName = async (req, res) => {
    try {
      const listfinal = await fetchProducts;
         console.log(req.params);
      const { productname } = req.params;
      const filteredProducts = listfinal.filter(product => product.productName.toLowerCase().includes(productname));
      console.log(filteredProducts);
      res.status(200).json(
        filteredProducts,
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'not finded',
        error: err,
      });
    }
  };

  getProductByCategory = async (req, res) => {
    try {
      const listfinal = await fetchProducts;
         console.log(req.params);
      const { productcategory } = req.params;
      const filteredProducts = listfinal.filter(product => product.productMaterial.toLowerCase().includes(productcategory));
      console.log(filteredProducts);
      res.status(200).json(
        filteredProducts,
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'not found',
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
