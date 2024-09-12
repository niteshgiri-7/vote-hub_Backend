const Election = require("../models/election");

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
    res.status(200).json({ response: savedElection });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
