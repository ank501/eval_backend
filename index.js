const express = require("express");
const connections = require("./db");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const auth = require("./middleware/auth.middleware");
require('dotenv').config()

const app = express();

app.use(express.json());
app.use("/users",userRouter);

app.use(auth)
app.use("/posts",postRouter)

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.listen(process.env.PORT,async()=>{
    try {
        await connections
        console.log("database is connected");
        console.log(`server is running at ${process.env.PORT}`);

    } catch (error) {
        console.log({msg:error.message});
    }
 
})