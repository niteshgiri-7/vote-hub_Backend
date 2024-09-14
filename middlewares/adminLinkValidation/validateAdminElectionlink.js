const Election = require("../../models/election");
const User = require("../../models/users");

const validateAdminElectionLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    const election = await Election.findById(id);
    if (!election)
      return res.status(404).json({ message: "Election not found" });
    if (election.createdBy.toString() !== adminId)
      return res.status(401).json({ message: "unauthorized amdin" });
   return next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

module.exports = validateAdminElectionLink;
