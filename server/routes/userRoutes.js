import  express  from "express"
import asyncHandler from "express-async-handler"
import { protect, admin } from "./../middleware/AuthMidleware.js"
import user from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
const userRoutes= express.Router()
//LOGIN
userRoutes.post(
    "/login",
    asyncHandler(
        async(req ,res)=>{
            const {email,password}=req.body
            const users=await user.findOne({email});
            if (users && (await users.matchPassword(password))) {
                res.json({
                    _id:users._id,
                    name:users.name,
                    email:users.email,
                    isAdmin:users.isAdmin,
                    token: generateToken(users._id) ,
                    createdAt:users.createdAt,
                    

                })
                
            } else {
                res.status(401)
                throw new Error("Invalid Email or Password")
                
            }
        }
    )
)
//register
userRoutes.post(
    "/",
    asyncHandler(async(req,res)=>{
        const {name,email,password}=req.body
        const userExists=await user.findOne({email})
        if(userExists){
            res.status(400)
            throw new Error("User already exists")
        }
        const User=await user.create({name,email,password})
        if (User) {
            res.status(201).json({
                _id:User._id,
                name:User.name,
                email:User.email,
                isAdmin:User.isAdmin,
                token: generateToken(User._id) ,
                createdAt:User.createdAt,
            })
            
        } else {
            res.status(400)
            throw new Error("Invalid User Data")
            
        }
    })
)
//getProfile 
userRoutes.get(
    "/profile",
    protect,
    asyncHandler(
        async(req ,res)=>{
            const User= await user.findById(req.user._id)
             if (User) {
             res.json({
                _id:User._id,
                name:User.name,
                email:User.email,
                isAdmin:User.isAdmin,
                token: generateToken(User._id) ,
                createdAt:User.createdAt,
                 

            })
            
           } else {
            res.status(404)
            throw new Error("User Not found")
           }
        }
    )
)
//UPDATEPROFILE
userRoutes.put(
    "/profile",
    protect,
    asyncHandler(
        async(req ,res)=>{
            const User= await user.findById(req.user._id)
           
           if (User) {
            User.name=req.body.name||User.name
            User.email=req.body.email||User.email
            if(req.body.password){
                User.password=req.body.password
            }
            const updateUser=await User.save()
            res.json({
                _id:updateUser._id,
                name:updateUser.name,
                email:updateUser.email,
                isAdmin:updateUser.isAdmin,
                token: generateToken(updateUser._id) ,
                createdAt:updateUser.createdAt,
                

            })
            
           } else {
            res.status(401)
            throw new Error("User Not found")
           }
        }
    )
)
userRoutes.get(
    "/",
    protect,
    admin,
    asyncHandler(async (req, res)=>{
        const users=await user.find({})
       
        res.json(users)

    })
)
export default userRoutes
