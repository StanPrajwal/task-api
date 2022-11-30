const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
const todoRouter = require("./router/todo")

app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.json({extended:false}))
app.use("/v1/tasks",todoRouter)

mongoose.connect(process.env.MOGO_URI).then(()=>console.log("Database connected")).catch((e)=>console.log(e.message))
app.listen(process.env.PORT || 3000,()=>console.log(`Server started http://localhost:${process.env.PORT}`))