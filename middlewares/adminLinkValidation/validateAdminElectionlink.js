const Election = require("../../models/election");
const User = require("../../models/users");

const validateAdminElectionLink = async (req, res, next) => {
  try {
    const { electionId } = req.body;
    const adminId = req.user.id;

    const election = await Election.findById(electionId);
    if (!election)
      return res.status(404).json({ message: "Election not found" });
    if (election.createdBy.toString() !== adminId)
      return res.status(401).json({ message: "unauthorized amdin" });
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

module.exports = validateAdminElectionLink;
