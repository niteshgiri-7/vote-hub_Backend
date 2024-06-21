const User = require("../models/users");

const isVoted = async(req,res,next)=>{
    const userId = req.user.id;
    const user = await User.findById(userId)
    const votingStatus = user.isVoted;
    if(votingStatus) return res.status(403).json({message:"voting can be done only once"});
    next();
}


module.exports =  isVoted;