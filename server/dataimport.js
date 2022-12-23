import express from 'express'
import { products } from './data/Products.js';
import { users } from './data/user.js'
import product from './models/productModel.js';
import user from './models/userModel.js'
const importdata=express.Router()
importdata.post("/user",async(req,res)=>{
  await user.remove({})
  const importUser=await user.insertMany(users)
  res.send({importUser})
});
importdata.post("/products",async(req,res)=>{
await product.remove({})
const importProducts =await product.insertMany(products)
res.send({importProducts})
})
export default importdata
