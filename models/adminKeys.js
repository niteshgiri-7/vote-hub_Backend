const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
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
    default: function() {
      // Adds 0.1 hours (6 minutes) to the current date and time
      return new Date(Date.now() + 0.3 * 60 * 60 * 1000);
    },
  },
});

// Create and export the model
const AdminKey = mongoose.model('AdminKey', adminKeySchema);

module.exports = AdminKey;
