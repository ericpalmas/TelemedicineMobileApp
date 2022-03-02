const mongoose = require("mongoose")

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  therapy: {
    type: String,
    required: false,
  },
  patientMedications: {
    type: String,
    required: false,
  },
})

var Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
