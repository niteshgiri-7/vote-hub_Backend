const Router = require("express").Router();
const { jwtVerify } = require("../authMiddleware/jwtAuth");
const validateId = require("../middlewares/validateId");
const checkAdminKey = require("../middlewares/checkAdminKey");
const userControl = require("../controllers/userControl");


Router.post("/signUp", checkAdminKey, userControl.signUp);

Router.post("/login", userControl.login);

Router.get("/profile/:id", jwtVerify, validateId, userControl.viewProfile);

Router.put("/profile/password", jwtVerify, userControl.changePassword);





module.exports = Router;
