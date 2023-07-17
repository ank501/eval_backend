const jwt = require("jsonwebtoken")

const auth = (req,res,next)=> {
const token = req.headers.authorization.split(" ")[1];

jwt.verify(token , "ankit" , (err,decoded)=>{
    if(decoded){
        next()
    }else{
        res.send("Invalid token")
    }
})
}

module.exports = auth