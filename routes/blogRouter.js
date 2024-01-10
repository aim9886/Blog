const express=require("express")
const Blog=require("../models/Blog")
let blogRouter=express.Router()


blogRouter.get("/",async (req,res)=>{
    try {
        let blogs=await Blog.find().lean()
        res.render("home",{blogs})
    } catch (error) {
        console.log(error);
    }
})


blogRouter.get("/about",(req,res)=>{
    res.render("about")
})

blogRouter.get("/blogs",(req,res)=>{
    res.render("blogs")
})

blogRouter.post("/blog", async (req,res)=>{
    const {title,snippet,body}=req.body
    console.log(req.body);
    try {
        await Blog.create({
            title:title,
            snippet:snippet,
            body:body
        })
        res.redirect("/blogs")
    } catch (error) {
        console.log(error);
    }
})

blogRouter.get("/blog/:id",async (req,res)=>{
    try {
        let id=req.params.id
        let blog=await Blog.findOne({_id:id}).lean()
        res.render("blog",{blog})
    } catch (error) {
        console.log(error);
    }
})

blogRouter.delete("/blog/:id",async (req,res)=>{
    try {
        let id=req.params.id
        await Blog.deleteOne({_id:id})
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
})

module.exports=blogRouter;