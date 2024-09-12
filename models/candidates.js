const mongoose = require("mongoose");
const schema = mongoose.Schema;

const candidate = new schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min:[18 ,'age cannot be less than 18']
    },
    party: {
        type: String,
        default:null,
       
    },
    voteCount: {
        type: Number,
        default: 0
    },
    regNo:{
        type:String,
        required:true,
        unique:true
    },
    electionId:{
        type:schema.Types.ObjectId,
        ref:"Election"
    }
})

const Candidate = mongoose.model("Candidate",candidate);

module.exports = Candidate;
