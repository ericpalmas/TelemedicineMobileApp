const mongoose = require("mongoose")

const surveySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

var Survey = mongoose.model('Survey', surveySchema)

module.exports = Survey
