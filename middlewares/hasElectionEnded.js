const Election = require("../models/election");

const hasElectionEnded = async (req, res, next) => {
  try {
    const { id } = req.params;
    const election = await Election.findById(id);
   
     if (Date.now() > election.endsAt)
      return res.status(400).json({ message: "Election Ended" });
    return next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = hasElectionEnded;