const Router = require("express").Router();
const User = require("../models/users");
const { jwtVerify, generateToken } = require("../authMiddleware/jwtAuth");
const validateId = require("../middlewares/validateId");


Router.post("/signUp", async (req, res) => {
    try {
        const user = req.body;

        const newUser = new User(user);
        const response = await newUser.save();
        const payLoad = {
            id: response.id,
            name: response.name
        }

        const token = generateToken(payLoad);
        res.status(200).json({ token: token, message: "user created successfully", id: response.id });
        console.log("new user successfully created");

    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
})

Router.post("/login", async (req, res) => {
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
            name: userHere.name
        }
        const token = generateToken(payLoad);
        res.status(200).json({ token: token, message: "login successful", id: userHere.id });

    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "internal server error" });
    }
})

Router.get("/profile/:id", jwtVerify,validateId, async (req, res) => {
    try {
        const { id } = req.params;
        const userHere = await User.findById(id).select('-password -role');
        if(!userHere) return res.status(404).json({message:"user not found"});
        const userdata = userHere;
        res.status(200).json({ userdata: userdata });
    }
    catch (err) {
          console.log(err.message);
          return res.status(404).json({ message: "user not found" });

    }
})

Router.put("/password", jwtVerify, async (req, res) => {
    try {
        const { citizenshipNo, password, newPassword } = req.body;
        const userHere = await User.findOne({ citizenshipNo: citizenshipNo });
        if (!(await userHere.comparePassword(password))) {
            return res.status(501).json({ message: "incorrect old password" });
        }
        if (password === newPassword) {
            return res.status(501).json({ message: "new password cannot be same as old password" });
        }
        userHere.password = newPassword;
        await userHere.save();
        return res.status(200).json({ message: "password changed successfully" });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: "internal serever error" });
    }
})

module.exports = Router;