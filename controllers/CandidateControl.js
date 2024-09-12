const Candidate = require("../models/candidates");
const User = require("../models/users");
const Election = require("../models/election");
module.exports.addNewCandidate = async (req, res) => {
  try {
    const { name, age, regNo, electionId } = req.body;
    const admin = req.user;
    if (!name || !age || !regNo || !electionId) {
      return res.status(400).json({ error: "incomplete data" });
    }
    const regNum = await Candidate.findOne({ regNo: regNo });
    if (regNum) return res.status(409).json({ error: "regNo already exists" });
    const election = await Election.findById(electionId);
    if (!election)
      return res.status(404).json({ message: "Invalid electionId" });
    const newCandidate = new Candidate({
      name,
      age,
      regNo,
      electionId,
    });
    const savedCandidate = await newCandidate.save();

    election?.candidates.push(savedCandidate._id);
    const savedElection = await election.save();
    return res
      .status(200)
      .json({ message: "candidate saved", candidate: savedCandidate });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    console.log(err.message);
  }
};

module.exports.removeCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const removedCandidate = await Candidate.findByIdAndDelete(id);
    if (!removedCandidate)
      return res.status(404).json({ message: "candidate not found" });
    const election = req.election;
    const newCandidates = election.candidates.filter(
      (candidate) => candidate._id.toString() !== id
    );
    await Election.findByIdAndUpdate(election._id, {
      candidates: newCandidates,
    });
    return res.status(200).json({ message: "candidate deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err.message);
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
    res
      .status(500)
      .json({ message: "error occurred while voting", err: err.message });
    console.log(err);
  }
};

module.exports.seeVoteCount = async (req, res) => {
  try {
    const candidate = await Candidate.find().sort({ voteCount: "desc" });
    const record = candidate.map((candidateData) => {
      return {
        name: candidateData.name,
        party: candidateData.party,
        voteCount: candidateData.voteCount,
      };
    });
    res.status(200).json({ records: record });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

module.exports.seeAllCandidates = async (req, res) => {
  try {
    const candidate = await Candidate.find().select("name party ");
    res.status(200).json({ canidates: candidate });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
