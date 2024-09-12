const User = require("../models/users");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.role !== "admin")
      return res.status(403).json({ message: "Access Denied!! Admins only" });
    next();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = isAdmin;
