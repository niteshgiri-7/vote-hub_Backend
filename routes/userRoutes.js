const Router = require("express").Router();
const { jwtVerify } = require("../authMiddleware/jwtAuth");
const validateId = require("../middlewares/validateId");
const userControl = require("../controllers/userControl");


Router.post("/signUp", userControl.signUp);


Router.post("/login",userControl.login);

Router.get("/profile/:id", jwtVerify,validateId, userControl.viewProfile);

Router.put("/password", jwtVerify, userControl.changePassword);

module.exports = Router;