const Candidate = require("../../models/candidates");
const Election = require("../../models/election");
const validateAdminCandidateLink = async (req,res, next) => {
  const { id } = req.params;
  const adminId = req.user.id;
  const candidate = await Candidate.findById(id);

  const electionId = candidate.electionId;
  const election = await Election.findById(electionId);

  const flag = election.createdBy == adminId ? true : false;

  if (!flag) return res.status(401).json({ message: "unauthorized admin" });

  return next();
};

module.exports = validateAdminCandidateLink;
