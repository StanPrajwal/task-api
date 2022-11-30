const router = require("express").Router()

const Todo = require("../model/todomodel")

router.post("/",async(req,res)=>{
    console.log(req.body)
    try {
        const todo = await Todo.create(req.body)
        res.status(201).json({
            todo
        })

    } catch (error) {
        res.status(400).json({
            error:error.message,
            message:req.body
        })
    }
})
router.get("/",async (req,res)=>{
    try {
        const todo =  await Todo.find()
        res.status(200).json({
            tasks:todo
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
})

router.get("/:id",async (req,res)=>{
    try {
        const todo = await Todo.findOne({_id:req.params.id})
        if(!todo){
           return res.status(404).json({
                error:"There is no task at that id"
            })
        }
        res.status(200).json({
            tasks:todo
        })
    } catch (error) {
        res.status(404).json({
            error:"There is no task at that id"
        })
    }
})

router.delete("/:id",async (req,res)=>{
    try {
        const todo = await Todo.findByIdAndDelete({_id:req.params.id})
        if(!todo){
            return res.status(404).json({
                 error:"There is no task at that id"
             })
         }
        res.status(204).json({
            respose:"deleted",
            tasks:todo
        })
    } catch (error) {
        res.status(404).json({
            error:"There is no task at that id"
        })
    }
})

router.put("/:id",async (req,res)=>{
    try {
        console.log(req.params.id)
        const todo = await Todo.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        res.json({
            todo
        })
    } catch (error) {
        res.status(404).json({
            error:"There is no task at that id"
        })
    }
})

router.delete("/",async (req,res)=>{
    try {
        const todo = await Todo.deleteMany()
        res.status(204).json({

            tasks:todo
        })
    } catch (error) {
        res.status(404).json({
            error:error.message
        })
    }
})

module.exports =router