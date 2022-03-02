const mongoose = require("mongoose")

const responseSchema = mongoose.Schema({
  //answer: [{}],
  answer: {
    type: Object,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Question',
  },
  surveyResponse: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SurveyResponse',
  },
})


var Response = mongoose.model('Response', responseSchema)

module.exports = Response
