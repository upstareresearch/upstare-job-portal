const jwt  = require("jsonwebtoken");
const userModel = require("../models/user.model");
// const cacheClient = require("../services/cache.services");

// ----------------------------
// auth middleware
// --------------------------
const userMiddleware = async(req, res, next)=>{
    const  token = req.cookies.token;

    try {
        if(!token){
            return res.status(404).json({
                message:"Token is not Found"
            })
        }

        // const blacklisted = await cacheClient.get(token)

        // if(blacklisted){
        //     return res.status(401).json({
        //         message:"Token is blacklisted"
        //     })
        // }

        const decode = jwt.verify(token, process.env.JWT_SECRET) 

        const user = await userModel.findById(decode.id);

        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }

        req.user = user;
        next()
    } catch (error) {
        console.log("error in middleware", error)
    }
};

module.exports = {userMiddleware};