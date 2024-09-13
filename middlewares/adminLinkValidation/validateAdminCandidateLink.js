const Candidate = require("../../models/candidates");
const validateAdminCandidateLink = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const candidate = await Candidate.findById(id).populate("electionId");
  if (!candidate) return res.status(404).json({ error: "Not Found" });
  const election = candidate.electionId;
  const adminId = election.createdBy.toString();
 

  const flag = adminId === userId ? true : false;

  if (!flag) return res.status(401).json({ message: "unauthorized admin" });
  req.election = election;

  return next();
};

module.exports = validateAdminCandidateLink;
