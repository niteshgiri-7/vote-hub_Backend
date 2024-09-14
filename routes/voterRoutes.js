const Router = require("express").Router();

const { jwtVerify } = require("../authMiddleware/jwtAuth");
const isRoleUser = require("../middlewares/isRoleUser");
const canJoin = require("../middlewares/canJoin");
const validateId = require("../middlewares/validateId");
const voterControl = require("../controllers/voterControl");
const electionControl = require("../controllers/electionControl");
const hasElectionEnded = require("../middlewares/hasElectionEnded");
const hasVoted = require("../middlewares/hasVoted");

Router.post(
  "/join-election/:id",
  validateId,
  jwtVerify,
  isRoleUser,
  canJoin,
  voterControl.joinElection
);

Router.get(
  "/view/joined-elections",
  jwtVerify,
  isRoleUser,
  electionControl.viewAllElectionVoter
);


Router.post(
  "/vote/election/:electionId/candidate/:id",
  jwtVerify,
  validateId,
  isRoleUser,
  hasVoted,
  hasElectionEnded,
  voterControl.vote
);
module.exports = Router;
