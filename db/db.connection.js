const mongoose = require("mongoose");

const initializeDbConnection = async () => {
  const mongoDbURL = process.env['URL']
  try {
    await mongoose.connect(mongoDbURL, {

      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
    });

    console.log("successfully connected");
  } catch (error) {
    console.error(
      "mongoose connection failed, kindly check connectivity",
      error
    );
  }
};

module.exports = initializeDbConnection;
