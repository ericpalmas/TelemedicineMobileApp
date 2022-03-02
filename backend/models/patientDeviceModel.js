const mongoose = require("mongoose")

const patientDeviceSchema = mongoose.Schema({
  macAdress: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
})
    
var PatientDevice = mongoose.model('PatientDevice', patientDeviceSchema)

module.exports = PatientDevice



