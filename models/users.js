const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const userSchema = new schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true,
        min:[18,'age cannot be less than 18']
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:String,
         enum:["voter","admin"],
         default:"voter",
         required:true
    },
    citizenshipNo:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    votedElection:[{
        type:schema.Types.ObjectId,
        ref:'Election',
    }]
})





userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        console.log('Password not modified');
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        
        next();
    } catch (err) {
        console.error('Error hashing password:', err);
        next(err);
    }
});





userSchema.methods.comparePassword=async function(attemptedPw){
    try{
    const isPwMatch = await bcrypt.compare(attemptedPw,this.password);
    return isPwMatch; 
}catch(err){
    console.log("error occured while comparing the password");
}
}


const User = mongoose.model("users",userSchema);
module.exports = User;