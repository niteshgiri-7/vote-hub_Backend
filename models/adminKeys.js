const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminKeySchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: function(){
      const timeStamp = Date.now();
      const date = new Date(timeStamp);
      const createdTime = date.toString()
      return createdTime;
    }
  },
  expiresAt: {
    type: Date,
    default: function () {
      const timeStamp = Date.now()+0.1*60*60*1000;
      const date = new Date(timeStamp)
      const expireDate = date.toString()
      return expireDate;
    },
    index: { expires: 300 },//auto deletes after 5 mins of expiring
  },
});

const AdminKey = mongoose.model("AdminKey", adminKeySchema);

module.exports = AdminKey;

