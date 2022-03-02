const express = require("express")
const asyncHandler = require("express-async-handler")
const router = express.Router()
const Patient = require("../models/patientModel")


// @desc Fetch all patients
// @route GET /api/patients
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const patients = await Patient.find({})

    if(patients){
      res.json(patients)
   } else {
      res.status(404)
      throw new Error('patients not found')
   }
    
  }),
)


module.exports = router