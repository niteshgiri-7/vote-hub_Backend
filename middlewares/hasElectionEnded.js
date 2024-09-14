const Election = require("../models/election");

const hasElectionEnded = async (req, res, next) => {
  try {
    const { electionId} = req.params;//ElectionId
    const election = await Election.findById(electionId);
   
     if (Date.now() > election.endsAt)
      return res.status(400).json({ message: "Election Ended" });
    return next();
  } catch (error) {
    console.log("has election ended",error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = hasElectionEnded;