const Election = require("../models/election");
const User = require("../models/users");

module.exports.viewAllElectionVoter = async (req, res) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId)
      .populate("joinedElection")
      .populate("votedElection");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      joinedElections: user.joinedElection,
      votedElections: user.votedElection,
    });

    console.log({
      joinedElections: user.joinedElection,
      votedElections: user.votedElection,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

module.exports.getVoteCount = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const election = await Election.findById(id).populate({
      path: "candidates",
      options: { sort: { voteCount: "desc" } },
    });
    const user = await User.findById(userId).select("-password");
    const electionId = election._id.toString();
    if (user.joinedElection.indexOf(electionId) === -1)
      return res
        .status(403)
        .json({ message: "can't see vote count without participation" });
    return res.json({ candidates: election.candidates });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getElectionResult = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const election = await Election.findById(id).populate({
      path: "candidates",
      options: {sort:({ voteCount: "desc" })},
    });
    if (!election)
      return res.status(404).json({ message: "Election not found" });
    const user = await User.findById(userId).populate("joinedElection");
    const hadJoined = user.joinedElection.some((e)=>e._id.toString()===id);
    if (user.role === "voter" && !hadJoined) {
      return res.status(403).json({ message: "you didn't joined this election" });
    }
     else if (user.role==="admin" && election.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "unauthorized admin to view result" });
    }
    const endsAt = election.endsAt;
    const endTime = new Date(endsAt).toString()
       if(Date.now()<endTime)
      return res.status(403).json({ message: "Election has not ended yet" });
      const candidates = election.candidates;
      res.status(200).json({ candidates: candidates });
    }
   catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
