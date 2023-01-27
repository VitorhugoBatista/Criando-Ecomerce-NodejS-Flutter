/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import productById from '../services/productServices/productById.js';
import products from '../services/productServices/products.js';
import removeProduct from '../services/productServices/removeProduct.js';

class ProductController {
  
  getProducts = async (req, res) => {
    res.send("ola")
   // try {
    //  const products = await products();
    //  res.status(200).json("ola"
        //status: true,
     // data: products,
  //    });
   // } catch (err) {
      //console.log(err);
     // res.status(500).json({
      //  error: err,
       // status: false,
    //  });
    //}
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
