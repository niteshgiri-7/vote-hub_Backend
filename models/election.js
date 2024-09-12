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
        required:true,
    },
    endsAt:{
        type: Date,
        required:true,
    },
    createdBy:{
        type:schema.Types.ObjectId,
        ref:"users",
    },
    candidates:[{
        type:schema.Types.ObjectId,
        ref:"Candidate"
    }]
})

const Election = mongoose.model("Election",election);
module.exports = Election;
