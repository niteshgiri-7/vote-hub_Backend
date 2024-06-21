const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWTsecretKey;


const generateToken = (Payload)=>{
      const token = jwt.sign(Payload,secretKey);
      return token;
}

const jwtVerify =(req,res,next)=>{
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"unauthorized"});
    }
    try{
    const token = authorization.split(' ')[1];
    const decoded =  jwt.verify(token,secretKey);
    
    req.user = decoded;
    next();
    }
    catch(err){
        console.log(err)
        res.status(401).json({error:"invalid token"});
  
    }
}

module.exports = {generateToken,jwtVerify};
