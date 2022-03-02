const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Patient = require('../models/patientModel');
const Survey = require('../models/surveyModel');
const Question = require('../models/questionModel');
const SurveyResponse = require('../models/surveyResponseModel');
const OfferedAnswer = require('../models/offeredAnswerModel');
const Response = require('../models/responseModel');
const PatientDevice = require('../models/patientDeviceModel');

// @desc Add new survey responses
// @route POST /api/surveys
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    var surveyID = req.body.surveyAnswers.survey.survey;
    var doctorID = req.body.surveyAnswers.survey.doctorID;
    var patientID = req.body.surveyAnswers.survey.patientID;
    var answers = req.body.surveyAnswers.answers;
    var questions = req.body.surveyAnswers.survey.questions;

    const surveyResponse = new SurveyResponse({
      patient: patientID,
      doctor: doctorID,
      survey: surveyID,
      completed: true,
    });

    const createdSurveyResponse = await surveyResponse.save();

    if (createdSurveyResponse) {
      for (var i = 0; i < answers.length; i++) {
        const response = new Response({
          answer: answers[i],
          patient: patientID,
          question: questions[i].question._id,
          surveyResponse: surveyResponse._id,
        });
        await response.save();
      }

      res.status(201).json(surveyResponse);
    }
  }),
);

router.get(
  '/patientSurvey/:id',
  asyncHandler(async (req, res) => {
    const patientByMacAddress = await PatientDevice.findOne({
      macAdress: req.params.id,
    });

    if (patientByMacAddress) {
      const lastSurvey = await SurveyResponse.find({
        patient: patientByMacAddress.patient,
        completed: false,
      })
        .sort({updatedAt: -1})
        .populate('survey', 'doctor')
        .findOne();

      var result = {};

      result.patientID = patientByMacAddress.patient;
      result.doctorID = lastSurvey.doctor;

      // query result are immutables
      result.survey = lastSurvey.survey._id;
      result.questions = [];
      var ress = await Question.find({survey: lastSurvey.survey._id}).populate(
        'survey',
      );

      for (var i = 0; i < ress.length; i++) {
        var question = {};
        question.answers = [];
        question.question = ress[i];
        result.questions.push(question);
      }

      if (result) {
        var idList = result.questions.map(q => q.question._id);
        if (idList) {
          var offeredAnswers = await OfferedAnswer.where('question').in(idList);
          if (offeredAnswers) {
            for (var i = 0; i < result.questions.length; i++) {
              var va = offeredAnswers.filter(
                answer =>
                  JSON.stringify(answer.question) ===
                  JSON.stringify(result.questions[i].question._id),
              );
              result.questions[i].answers = va;
            }
          }

          res.json(result);
        }
      } else {
        res.status(404);
        throw new Error('Survey not found');
      }
    } else {
      res.status(404);
      throw new Error('uniqueId not found');
    }
  }),
);

module.exports = router;
