const express =  require("express");
const UserModel = require("../model/userSchema");
const bcrypt = require("bcrypt")
const userRouter= express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register",async(req,res)=>{
   const {email,password ,gender ,name} = req.body
   try {
    bcrypt.hash(password, 3,async function(err, hash) {
      if(err){
        res.status(400).json({error:err.message})
      }else{
        const user = new UserModel({name,password:hash , email,gender});
        await user.save()
        res.status(200).json({msg:"user is registered successfully"})
      }
    });
   } catch (error) {
       res.status(400).json({msg:error})
   }
})


userRouter.post("/login" , async(req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await UserModel.findOne({email})
        console.log(user);
        if(user){
            bcrypt.compare(password,user.password, function(err, result) {
                console.log(result);
               if(result){
                var token = jwt.sign({"user":"ankit"},"ankit")
                res.status(200).json({"msg":"user Logged in seuccessfully" , "token" : token})
               }else{
                res.status(400).json({"msg":"Incorrect Password"})
               }
            });
        }else{
            res.status(400).json({"msg":"Wrong Email / User Not Found"})
        }
    } catch (error) {
        res.status(400).json({"msg":error})
    }
})

module.exports= userRouter;