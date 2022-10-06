const mongoose = require("mongoose")

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a patient name"],
    },
  },
  { timestamps: true }
)

mongoose.exports = mongoose.model("Patient", patientSchema)
