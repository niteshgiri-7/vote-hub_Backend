
const User = require("../models/users");

const isRoleUser = async(req,res,next)=>{
    const userId= req.user.id;
    const user = await User.findById(userId);
    if(user.role==='admin'){
        return res.status(403).json({message:"admin cannot vote"});
    }
    next();

   }

   module.exports = isRoleUser;