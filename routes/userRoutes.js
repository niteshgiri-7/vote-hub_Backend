const Router = require("express").Router();
const { jwtVerify } = require("../authMiddleware/jwtAuth");
const validateId = require("../middlewares/validateId");
const checkAdminKey = require("../middlewares/checkAdminKey");
const isRoleUser = require("../middlewares/isRoleUser");
const userControl = require("../controllers/userControl");
const electionControl = require("../controllers/electionControl");

Router.post("/signUp", checkAdminKey, userControl.signUp);

Router.post("/login", userControl.login);

Router.get("/profile/:id", jwtVerify, validateId, userControl.viewProfile);

Router.put("/password", jwtVerify, userControl.changePassword);

Router.post(
  "/join-election/:id",
  validateId,
  jwtVerify,
  isRoleUser,
  userControl.joinElection
);

Router.get("/get-elections",jwtVerify,isRoleUser, electionControl.viewAllElectionVoter);

module.exports = Router;
