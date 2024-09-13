const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminKeySchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: function () {
      return new Date(Date.now() + 0.3 * 60 * 60 * 1000);
    },
    index: { expires: 300 },//auto deletes after 5 mins of expiring
  },
});

const AdminKey = mongoose.model("AdminKey", adminKeySchema);

module.exports = AdminKey;

