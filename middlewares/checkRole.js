const User = require("../models/users");
const checkRole = async (req,res,next)=>{
    try{
    const userId = req.user.id;
    const user = await User.findById(userId);
    if(user.role!=='admin')
        return res.status(403).json({message:"user must be admin"});
    next();
}
catch(err){
    console.log("this is role checker")
    console.log(err.message);
    console.log("role check done")
}
}
module.exports = checkRole;
