const AdminKey = require("../models/adminKeys");

const checkAdminKey = async (req, res, next) => {
  try {
    const user = req.body;
    const role = user.role;
    if (role !== "admin") {
      return next();
    }
    const adminKey = user.key;
    if (!adminKey) {
      return res.status(403).json({ error: "admin key required" });
    }
    const adminKeyRecord = await AdminKey.findOne({ key: adminKey });
    if (!adminKeyRecord) {
      return res.status(403).json({ error: "Invalid key" });
    }

    if (adminKeyRecord.expiresAt < Date.now()) {
      return res.status(403).json({ error: "Key expired" });
    }
    return next();
  } catch (error) {
    console.log("error checking admin Key", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = checkAdminKey;
