const mongoose = require("mongoose")
const schema =mongoose.Schema;

const adminKeys = new schema({
    key:{
        type:String,
        required:true,
    },
    createdAt:{
        type: Date,
        default:Date.now,
    },
    expiresAt:{
        type:Date,
        default: function(){
            return new Date(Date.now()+0.1*60*60*1000)
        },
    }
})

const AdminKey = mongoose.model("AdminKey",adminKeys)

module.exports = AdminKey;