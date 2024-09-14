const User = require("../models/users");
const Election = require("../models/election");
const { generateToken } = require("../authMiddleware/jwtAuth");

module.exports.signUp = async (req, res) => {
  try {
    const user = req.body;
    const isCitizenDuplicate = await User.findOne({
      citizenshipNo: user.citizenshipNo,
    });
    if (isCitizenDuplicate) {
      return res.status(409).json({ error: "Citizenship no. already exists" });
    }

    const newUser = new User(user);
    const response = await newUser.save();
    const payLoad = {
      id: response.id,
      name: response.name,
    };

    const token = generateToken(payLoad);
    res.status(200).json({
      token: token,
      message: "user created successfully",
      id: response.id,
      role: response.role,
    });
    console.log("new user successfully created");
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { citizenshipNo, password } = req.body;
    const userHere = await User.findOne({ citizenshipNo: citizenshipNo });
    if (!userHere) {
      return res.status(404).json({ message: "user not found" });
    }
    const isPwMatch = await userHere.comparePassword(password);
    if (!isPwMatch) {
      return res.status(501).json({ message: "incorrect Password" });
    }
    const payLoad = {
      id: userHere.id,
      name: userHere.name,
    };
    const token = generateToken(payLoad);
    res.status(200).json({
      token: token,
      message: "login successful",
      id: userHere.id,
      role: userHere.role,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports.viewProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userHere = await User.findById(id).select("-password ");
    if (!userHere) return res.status(404).json({ message: "user not found" });

    res.status(200).json({ userdata: userHere });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const { citizenshipNo, password, newPassword } = req.body;
    const userHere = await User.findOne({ citizenshipNo: citizenshipNo });
    if (!(await userHere.comparePassword(password))) {
      return res.status(501).json({ message: "incorrect old password" });
    }
    if (password === newPassword) {
      return res
        .status(501)
        .json({ message: "new password cannot be same as old password" });
    }
    userHere.password = newPassword;
    await userHere.save();
    return res.status(200).json({ message: "password changed successfully" });
  } catch (err) {
    console.log(err.message);
  }
};


