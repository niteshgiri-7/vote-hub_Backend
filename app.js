const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); 
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const resultRoutes = require("./routes/resultRoutes");
const voterRoutes = require("./routes/voterRoutes");

const app = express();
const PORT = 3000;

app.use(cors()); //allowed any origin
app.use(bodyParser.json()); 

app.use("/user", userRoutes);
app.use("/voter", voterRoutes);
app.use("/admin", adminRoutes);
app.use("/election", resultRoutes);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
