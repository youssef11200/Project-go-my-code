import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import user from "../models/userModel.js";

const protect = AsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await user.findById(decoded.id).select("-password");
      next();
    } catch (error) {
    
      res.status(401);
      throw new Error("Not autorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not autorized, no token");
  }
});
const admin =(req,res,naxt)=>{
  if (req.user && req.user.isAdmin) {
    naxt()
    
  } else {
    res.status(401)
    throw new Error("Not authorized as an Admin")
    
  }
}
export  { protect, admin };
