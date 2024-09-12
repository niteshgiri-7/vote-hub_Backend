const Candidate = require("../../models/candidates");
const Election = require("../../models/election");
const validateAdminCandidateLink = async (req, res, next) => {
  const { id } = req.params;
  const adminId = req.user.id;
  const candidate = await Candidate.findById(id);
  if (!candidate) return res.status(404).json({ error: "Not Found" });
  const electionId = candidate.electionId;
  const election = await Election.findById(electionId);

  const flag = election.createdBy == adminId ? true : false;

  if (!flag) return res.status(401).json({ message: "unauthorized admin" });
  req.election = election;
  
  return next();
};

module.exports = validateAdminCandidateLink;
