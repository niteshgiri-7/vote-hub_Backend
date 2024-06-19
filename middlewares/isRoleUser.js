
const User = require("../models/users");

const isRoleUser = async(req,res,next)=>{
    const userId= req.user.id;
    const UserRole = await User.findById(userId).select('role');
    if(UserRole==='admin'){
        return res.status(403).json({message:"admin cannot vote"});
    }
    next();

   }

   module.exports = isRoleUser;