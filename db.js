const mongoose =require("mongoose");
require("dotenv").config();
const mongoUrl = process.env.dbUrl;
// const mongoUrl= "mongodb://localhost:27017/votingApp";


mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("connected to database server");
})
db.on('error',()=>{
    console.log("error while connecting to database server");
})
db.on('connection',()=>{
    console.log("disconnected to database server");
})

module.exports = db;