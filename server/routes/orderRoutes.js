import  express  from "express"
import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

import {admin, protect} from "./../middleware/AuthMidleware.js"

const orderRoutes= express.Router()
//CREATE ORDER
orderRoutes.post(
    "/",
    protect,
    asyncHandler(
        async(req ,res)=>{
           
         const{
            
            orderItems,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
         }=req.body
         if (orderItems && orderItems.length===0) {
            res.status(400)
            throw new Error("No order items")
            
         } else {
            const order=new Order({
                user:req.user._id,
                orderItems,
                shippingAddress,
                paymentMethod,
                itemPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })
            const createOrder=await order.save()
            res.status(201).json(createOrder)
         }
           
        }
    )
)
// GET ORDER BY ID
orderRoutes.get(
    "/:id",
    protect,
    asyncHandler(
        async(req ,res)=>{
           const order =await Order.findById(req.params.id).populate(
            "user",
            "name email"
           )

         if (order ) {
            res.json(order)
         } else {
         res.status(404)
         throw new Error("order not found")
         }
           
        }
    )
)
//order is paid
orderRoutes.put(
    "/:id/pay",
    protect,
    asyncHandler(
        async(req ,res)=>{
           const order =await Order.findById(req.params.id)
        

         if (order ) {
            order.isPaid=true
            order.paidAt=Data.now
            order.paymentResult={
                id:req.body.id,
                status:req.body.status,
                update_time:req.body.update_time,
                email_address:req.body.email_address
            }
            const updateOrder=await order.save()
            req.json(updateOrder)
         } else {
         res.status(404)
         throw new Error("order not found")
         }
           
        }
    )
)


// ORDER IS PAID
orderRoutes.put(
    "/:id/delivered",
    protect,
    asyncHandler(
        async(req ,res)=>{
           const order =await Order.findById(req.params.id)
        

         if (order ) {
            order.isDelivered=true
            order.deliveredAt=Date.now()
         
            const updateOrder=await order.save()
            req.json(updateOrder)
         } else {
         res.status(404)
         throw new Error("order not found")
         }
           
        }
    )
)


//ADMIN GET ALL ORDER
orderRoutes.get(
    "/all",
    protect,
    admin,
    asyncHandler(async (req,res)=>{
        const orders=await Order.find({})
        .sort({_id:-1})
        .populate("user","id name email")
        res.json(orders)
    })
)
//user login orders
orderRoutes.get(
    "/",
    protect,
    asyncHandler(async (req,res)=>{
        const order=await Order.find({user:req.user._id}).sort({_id:-1})
        res.json(order)
    })
)
export default orderRoutes