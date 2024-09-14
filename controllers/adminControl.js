const User = require("../models/users");
const Election = require("../models/election");
const Candidate = require("../models/candidates");
module.exports.addNewCandidate = async (req, res) => {
  try {
    const { id } = req.params; //electionId
    const { name, age, regNo, party } = req.body;
    if (!name || !age || !regNo) {
      return res.status(400).json({ error: "incomplete data" });
    }
    const regNum = await Candidate.findOne({ regNo: regNo });
    if (regNum) return res.status(409).json({ error: "regNo already exists" });
    const election = await Election.findById(id);
    if (!election)
      return res.status(404).json({ message: "Invalid electionId" });
    const newCandidate = new Candidate({
      name,
      age,
      regNo,
      party,
      electionId:id,
    });
    console.log(newCandidate);
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

module.exports.viewAllElections = async (req, res) => {
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
