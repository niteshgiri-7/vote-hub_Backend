const Election = require("../models/election");
const User = require("../models/users");
module.exports.createElection = async (req, res) => {
  try {
    const { name, description, startsAt, endsAt } = req.body;
    const admin = req.user;
    if (!name || !description || !startsAt || !endsAt)
      return res.status(400).json({ error: "No content" });
    const newElection = new Election({
      name,
      description,
      startsAt,
      endsAt,
      createdBy: admin.id,
    });
    const savedElection = await newElection.save();
    return res.status(200).json({ response: savedElection });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.viewAllElectionAdmin = async (req, res) => {
  try {
    const userId = req.user.id;
    const elections = await Election.find({ createdBy: userId }).populate(
      "candidates"
    );
    console.log(elections);
    res.status(200).json({ message: elections });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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
    const user = await User.findById(userId);
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
    const election = await Election.findById(id).populate("candidates");
    if (!election)
      return res.status(404).json({ message: "Election not found" });
    const endsAt = election.endsAt;
    if (Date.now() < endsAt)
      return res.status(403).json({ message: "Election has not ended yet" });
    const candidates = election.cadidates;
    res.status(200).json({ candidates: candidates });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
