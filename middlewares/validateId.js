const mongoose = require("mongoose");

const validateId = (req,res,next)=>{
    let {id}= req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"invalid ID"});
    }
  return  next();
}

module.exports = validateId;