const Router = require("express").Router();
const { jwtVerify } = require("../authMiddleware/jwtAuth");
const electionControl = require("../controllers/electionControl");
const validateId = require("../middlewares/validateId");

Router.get(
  "/:id/vote-counts",
  jwtVerify,
  validateId,
  electionControl.getVoteCount
);

Router.get("/:id/result",jwtVerify,validateId,electionControl.getElectionResult);
module.exports = Router;
