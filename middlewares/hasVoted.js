const Candidate = require("../models/candidates");
const User = require("../models/users");

const hasVoted = async (req, res, next) => {
  const { id } = req.params; //candidateId
  const userId = req.user.id;
  const user = await User.findById(userId);
  const candidate = await Candidate.findById(id).populate("electionId");
  const electionId = candidate.electionId._id.toString();
  if (user.votedElection.indexOf(electionId) !== -1)
    return res.status(403).json({ message: "Already voted in this election" });

  next();
};

module.exports = hasVoted;
