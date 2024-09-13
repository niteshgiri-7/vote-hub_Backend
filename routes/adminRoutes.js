const Router = require("express").Router();
const KeyControl = require("../controllers/KeyControl");
const Election = require("../controllers/electionControl");
const { jwtVerify } = require("../authMiddleware/jwtAuth");
const isAdmin = require("../middlewares/isAdmin");

Router.get("/get-admin-key", KeyControl.getAdminKey);
Router.post("/create-election", jwtVerify, isAdmin, Election.createElection);
module.exports = Router;
Router.get("/all-elections", jwtVerify, isAdmin, Election.viewAllElectionAdmin);
