const express =  require("express");
const PostModel = require("../model/postSchema");

const postRouter = express.Router();

postRouter.post("/add",async(req,res)=>{
   try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).json({"msg" : "post added"})
   } catch (error) {
    res.status(400).json({"msg" :error})
   }
})

postRouter.get("/",async(req,res)=>{
    const {device,device1,device2} = req.query
    try {
        if(device){
            const post =await PostModel.findOne({device});
             res.status(200).json(post)
        }else if(device1 && device2){
            const post =await PostModel.find({$or : [{device:device1},{device:device2}]});
            res.status(200).json(post)
        }else{
            const post =await PostModel.find();
            res.status(200).json(post)
        }
   
    } catch (error) {
     res.status(400).json({"msg" :error})
    }
 })
 postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}= req.params
    try {
        await PostModel.findByIdAndDelete(id);
        res.status(200).json({"msg" :"post deleted succefully"})
    } catch (error) {
        res.status(400).json({"msg" :error})
    }
 })

 postRouter.patch("/update/:id",async(req,res)=>{
    const {id}= req.params
    const payload = req.body
    try {
        await PostModel.findByIdAndUpdate({_id:id},payload);
        res.status(200).json({"msg" :"post updated succefully"})
    } catch (error) {
        res.status(400).json({"msg" :error})
    }
 })


module.exports= postRouter;