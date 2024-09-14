const Election = require("../models/election");
const User = require("../models/users");
const Candidate = require("../models/candidates");

module.exports.joinElection = async (req, res) => {
  try {
    const { id } = req.params;//electionId
    const userId = req.user.id;
    const election = await Election.findById(id);
    if (!election)
      return res.status(404).json({ message: "Election Not found" });
    const user = await User.findById(userId).select("-password");

    if (user?.joinedElection.indexOf(id) !== -1)
      return res
        .status(409)
        .json({ message: "You have already joined that election" });
    else user.joinedElection.push(id);
    const savedUser = await user.save();
    return res
      .status(200)
      .json({ message: "election joined", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("hi", error.message);
  }
};

module.exports.vote = async (req, res) => {
    try {
      const { id } = req.params; //candidate ID
      const userId = req.user.id;
      const user = await User.findById(userId);
  
      const candidate = await Candidate.findById(id).populate("electionId");
      const electionId = candidate.electionId._id.toString();
      if (user.joinedElection.indexOf(electionId) === -1)
        return res
          .status(403)
          .json({ message: "can't vote without participation" });
  
      candidate.voteCount++;
      await candidate.save();
      user.votedElection.push(electionId);
      await user.save();
      return res.status(200).json({ message: "voted Successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal Error Occurred" });
      console.log(err);
    }
  };