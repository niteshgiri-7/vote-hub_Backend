const Router = require("express").Router();
const { jwtVerify } = require("../authMiddleware/jwtAuth");
const checkRole = require("../middlewares/checkRole");
const validateId = require("../middlewares/validateId");
const isRoleUser = require("../middlewares/isRoleUser");
const isVoted = require("../middlewares/isVoted");
const candidateControl = require("../controllers/CandidateControl");

Router.post("/add", jwtVerify, checkRole, candidateControl.addNewCandidate);

Router.delete("/remove/:id", jwtVerify, checkRole, validateId, candidateControl.removeCandidate);

Router.post("/vote/:id", jwtVerify, isRoleUser, validateId, isVoted, candidateControl.vote);

Router.get("/vote/count",candidateControl.seeVoteCount);

Router.get("/all",candidateControl.seeAllCandidates);
module.exports = Router;