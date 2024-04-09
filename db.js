const mongoose = require("mongoose");

const mongouri =
  "mongodb+srv://Salon:Salon@cluster0.8879wzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectTomongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongouri);
    await console.log("connected successfully");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectTomongo;
