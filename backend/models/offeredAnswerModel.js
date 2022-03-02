const mongoose = require("mongoose")

const offeredAnswerSchema = mongoose.Schema({
  text: {
    type: String,
    required: false,
  },
  image: {
    type: Number,
    required: false,
  },
  selected: {
    type: Boolean,
    required: false,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Question',
  },
})


var OfferedAnswer = mongoose.model('OfferedAnswer', offeredAnswerSchema)

module.exports = OfferedAnswer
