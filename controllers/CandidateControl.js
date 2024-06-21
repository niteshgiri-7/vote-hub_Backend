const Candidate = require("../models/candidates");
const User = require("../models/users");

module.exports.addNewCandidate = async (req, res) => {
    try {
        const canDdate = new Candidate(req.body);
        await canDdate.save();
        res.status(200).json({ message: "candidate saved", candidate: canDdate });
    }
    catch (err) {
        res.status(500).json({ error: "internal server error" });
        console.log(err.message)
    }
}

module.exports.removeCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const canDdate = await Candidate.findByIdAndDelete(id);
        if (!canDdate) return res.status(404).json({ message: "candidate not found" })
        res.status(200).json({ message: "candidate deleted" });
    }
    catch (err) {
        res.status(500).json({ error: "unable to delete" });
        console.log(err.message);
    }
}

module.exports.vote =  async (req, res) => {
    try {
        const { id } = req.params;
           const userId = req.user.id;
        const candidate = await Candidate.findById(id);
        if (!candidate) return res.status(404).json({ message: "candidate not found" });

        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "user not found" });

        candidate.votes.push({ user: userId });
        candidate.voteCount++;
        await candidate.save();

        user.isVoted = true;
        await user.save();
        res.status(200).json({ message: "voting successfully done"})
    }

    catch (err) {
        res.status(500).json({ message: "error occurred while voting", err: err.message });
        console.log(err);
    }

}

module.exports.seeVoteCount = async(req,res)=>{
    try{
    const candidate = await Candidate.find().sort({voteCount:'desc'});
    const record = candidate.map((candidateData)=>{
                   return {
                    name:candidateData.name,
                    party: candidateData.party,
                    voteCount: candidateData.voteCount
                   }
    })
    res.status(200).json({records:record});
}
catch(err){
    console.log(err)
    res.status(500).json(err.message);
}
}

module.exports.seeAllCandidates = async(req,res)=>{
    try{
    const candidate = await Candidate.find().select('name party ');
    res.status(200).json({canidates:candidate});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
}