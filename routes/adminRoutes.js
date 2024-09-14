const Router = require("express").Router();
const KeyControl = require("../controllers/KeyControl");
const ElectionControl = require("../controllers/electionControl");
const AdminControl = require("../controllers/adminControl");
const { jwtVerify } = require("../authMiddleware/jwtAuth");
const validateId = require("../middlewares/validateId");
const isAdmin = require("../middlewares/isAdmin");
const validateAdminElectionLink = require("../middlewares/adminLinkValidation/validateAdminElectionlink");
const validateAdminCandidateLink = require("../middlewares/adminLinkValidation/validateAdminCandidateLink");

Router.get("/get-admin-key", KeyControl.getAdminKey);

Router.post(
  "/create-election",
  jwtVerify,
  isAdmin,
  AdminControl.createElection
);

Router.get(
  "/view/all-elections",
  jwtVerify,
  isAdmin,
  AdminControl.viewAllElections
);
Router.post(
  "/election/:id/add-candidate",
  jwtVerify,
  validateId,
  isAdmin,
  validateAdminElectionLink,
  AdminControl.addNewCandidate
);

Router.delete(
  "/election/:electionId/remove/candidate/:id",
  jwtVerify,
  isAdmin,
  validateId,
  validateAdminCandidateLink,
  AdminControl.removeCandidate
);


module.exports = Router;
