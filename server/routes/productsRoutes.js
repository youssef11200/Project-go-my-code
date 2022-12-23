import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../models/productModel.js";
import { admin, protect } from "./../middleware/AuthMidleware.js";
import {upload} from "../utils/multer.js";
//getAll
const productsRoutes = express.Router();
productsRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pagenumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ id: -1 });

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);
// admin get product without search and pagination
productsRoutes.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
//getById
productsRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
//product review
productsRoutes.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      console.log(product);
      const alreadyReviewed = product.review.find(
        (r) => r.user._id.toString() === req.user._id.toString()
      );
      if (alreadyReviewed != undefined) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.review.push(review);
      product.numReviews = product.review.length;
      // product.rating= product.review.reduce((acc,item)=>item.rating=acc,0)/product.review.length
      await product.save();
      res.status(201).json({ message: "reviewed added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
// DELETE PRODUCT
productsRoutes.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
// CREATE PRODUCT
productsRoutes.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const productExist = await Product.findOne({ name });
    if (productExist) {
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      const product = new Product({
        name,
        price,
        description,
        image,
        countInStock,
        user: req.user._id,
      });
      if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    }
  })
);
// EDIT PRODUCT
productsRoutes.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name ||  product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.countInStock = countInStock || product.countInStock;
      const updateProduct = await product.save();
      res.json(updateProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
productsRoutes.post(
  "/addProduct",
  protect,admin,
  upload("products").single("file"),
  asyncHandler(async (req, res) => {
    const url = `${req.protocol}://${req.get("host")}`;
    console.log(req.file);
    const { file } = req;
    try {
      const newproduct = await new Product({
        ...req.body,
        user: req.user._id,
      });
      newproduct.image = `${url}/${file.path}`;
      await newproduct.save();
      res.send({ newproduct, msg: "product succefully added" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  
));
export default productsRoutes;
