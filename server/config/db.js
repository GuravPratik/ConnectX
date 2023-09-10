const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected successfully");
  } catch (error) {
    console.log("Error while connecting to database");
    process.exit(1);
  }
}

module.exports = connectToDB;
