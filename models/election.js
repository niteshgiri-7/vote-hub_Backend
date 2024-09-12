const mongoose = require("mongoose")
const schema = mongoose.Schema;

const election = new schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    startsAt:{
        type:Date,
        default:Date.now,
    },
    endsAt:{
        type: Date,
        required:true,
    },
    createdBy:{
        type:schema.Types.ObjectId,
        ref:"users",
    }
})

const Election = schema.model("Election",election);
module.exports = Election;
