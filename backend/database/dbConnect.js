const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/e-comm";
const dbConnect = async () => {
  try {
    await mongoose.connect(URI);
    console.log("database connected");
  } catch (error) {
    console.log("error in connecting database");
  }
};
module.exports = dbConnect;
