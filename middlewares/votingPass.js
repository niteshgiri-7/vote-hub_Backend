const User = require("../models/users");
const isRoleUser = async(req,res,next)=>{
    const {userId} = req.user.id;
    const userRole = await User.findById(userId).select("role");
    if(userRole =="admin"){
        return res.status(403).json({message:"admin cannot vote"});
    }
  return  next();
}

module.exports = isRoleUser;