const Router = require("express").Router();
const { jwtVerify } = require("../authMiddleware/jwtAuth");
const validateId = require("../middlewares/validateId");
const isRoleUser = require("../middlewares/isRoleUser");
const hasVoted = require("../middlewares/hasVoted");
const candidateControl = require("../controllers/CandidateControl");
const isAdmin = require("../middlewares/isAdmin");
const validateAdminCandidateLink = require("../middlewares/adminLinkValidation/validateAdminCandidateLink");
Router.post("/add", jwtVerify, isAdmin, candidateControl.addNewCandidate);

Router.delete("/remove/:id", jwtVerify, isAdmin, validateId, validateAdminCandidateLink, candidateControl.removeCandidate);

Router.post("/vote/:id", jwtVerify, isRoleUser, validateId, hasVoted, candidateControl.vote);

Router.get("/vote/count",candidateControl.seeVoteCount);

Router.get("/all",candidateControl.seeAllCandidates);
module.exports = Router;