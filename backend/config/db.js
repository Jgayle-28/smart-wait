const mongoose = require("mongoose")

// Connects us to MongoDB data base
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(
      `MONGO DB connected ${conn.connection.host}`.brightGreen.underline.bold
    )
  } catch (error) {
    console.log(`Error: ${error.message}`.brightRed.underline.bold)
    process.exit(1)
  }
}

module.exports = connectDB
