const AdminKey = require("../models/adminKeys");
module.exports.getAdminKey = async (req, res) => {
  try {
    const keyUtils = () => {
      const key = Math.floor(Math.random() * (9 - 0) + 0);
      return key;
    };

    const genAdminKey = () => {
      let key = "";
      for (let i = 0; i < 9; i++) {
        key += keyUtils();
      }
      return key;
    };

    const generatedKey = genAdminKey();
    const newAdminKey = new AdminKey({ key: generatedKey });
    const response = await newAdminKey.save();
    res.status(200).json({ response: response });
  } catch (error) {
    console.log(error.message);
  }
};
