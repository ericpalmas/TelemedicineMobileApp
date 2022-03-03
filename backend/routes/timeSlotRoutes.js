const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const TimeSlot = require('../models/timeSlotModel');
const SurveyResponse = require('../models/surveyResponseModel');
const PatientDevice = require('../models/patientDeviceModel');

const modifySingleDigit = val => {
  if (/^\d$/.test(val)) {
    return '0' + val;
  } else return val;
};

router.put(
  '/',
  asyncHandler(async (req, res) => {
    const {surveyId, uniqueId} = req.body;
    const patientByMacAddress = await PatientDevice.findOne({
      macAdress: uniqueId,
    });

    console.log(patientByMacAddress);

    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth() + 1;
    var currentDay = today.getDate();
    var currentHour = today.getHours();
    var currentMinute = today.getMinutes();

    console.log(today);

    if (patientByMacAddress) {
      const lastResponse = await SurveyResponse.findOne({
        patient: patientByMacAddress.patient,
        survey: surveyId,
      }).sort({updatedAt: -1});

      // last response date ha qualcosaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      const lastResponseDate = new Date(lastResponse.updatedAt);

      console.log(lastResponseDate);

      var lastResponseYear = lastResponseDate.getFullYear();
      var lastResponseMonth = lastResponseDate.getMonth() + 1;
      var lastResponseDay = lastResponseDate.getDate();
      var lastResponseHour = lastResponseDate.getHours();
      var lastResponseMinute = lastResponseDate.getMinutes();

      const surveyTimeSlots = await TimeSlot.find({survey: surveyId});

      console.log('surveyTimeSlots:' + surveyTimeSlots.length);

      var alreadyResponse = false;
      var inTimeSlot = false;

      // if oggi > orario disponibile && oggi < orario disponibile
      ///// if ultimaRisposta > orario disponibile && ultimaRisposta < orario disponibile
      ////////// inTimeSlot = true, alreadyResponse = false
      ///// else
      ////////// inTimeSlot = true, alreadyResponse = true
      // else
      //// inTimeSlot = false, alreadyResponse = false

      for (var i = 0; i < surveyTimeSlots.length; i++) {
        // prima controllo che l'ora attuale sia accettabile controllando le fascie orarie del questionario
        if (
          Date.parse(
            modifySingleDigit(currentYear) +
              '/' +
              modifySingleDigit(currentMonth) +
              '/' +
              modifySingleDigit(currentDay) +
              ' ' +
              modifySingleDigit(currentHour) +
              ':' +
              modifySingleDigit(currentMinute) +
              '-0500',
          ) /
            1000 >
            Date.parse(
              modifySingleDigit(currentYear) +
                '/' +
                modifySingleDigit(currentMonth) +
                '/' +
                modifySingleDigit(currentDay) +
                ' ' +
                modifySingleDigit(surveyTimeSlots[i].startHour) +
                ':' +
                modifySingleDigit(surveyTimeSlots[i].startMinutes) +
                '-0500',
            ) /
              1000 &&
          Date.parse(
            modifySingleDigit(currentYear) +
              '/' +
              modifySingleDigit(currentMonth) +
              '/' +
              modifySingleDigit(currentDay) +
              ' ' +
              modifySingleDigit(currentHour) +
              ':' +
              modifySingleDigit(currentMinute) +
              '-0500',
          ) /
            1000 <
            Date.parse(
              modifySingleDigit(currentYear) +
                '/' +
                modifySingleDigit(currentMonth) +
                '/' +
                modifySingleDigit(currentDay) +
                ' ' +
                modifySingleDigit(surveyTimeSlots[i].endHour) +
                ':' +
                modifySingleDigit(surveyTimeSlots[i].endMinutes) +
                '-0500',
            ) /
              1000
        ) {
          // ora controllo che all'interno di quella fascia oraria non ci sia già una risposta
          inTimeSlot = true;
          if (
            Date.parse(
              modifySingleDigit(lastResponseYear) +
                '/' +
                modifySingleDigit(lastResponseMonth) +
                '/' +
                modifySingleDigit(lastResponseDay) +
                ' ' +
                modifySingleDigit(lastResponseHour) +
                ':' +
                modifySingleDigit(lastResponseMinute) +
                '-0500',
            ) /
              1000 >
              Date.parse(
                modifySingleDigit(currentYear) +
                  '/' +
                  modifySingleDigit(currentMonth) +
                  '/' +
                  modifySingleDigit(currentDay) +
                  ' ' +
                  modifySingleDigit(surveyTimeSlots[i].startHour) +
                  ':' +
                  modifySingleDigit(surveyTimeSlots[i].startMinutes) +
                  '-0500',
              ) /
                1000 &&
            Date.parse(
              modifySingleDigit(lastResponseYear) +
                '/' +
                modifySingleDigit(lastResponseMonth) +
                '/' +
                modifySingleDigit(lastResponseDay) +
                ' ' +
                modifySingleDigit(lastResponseHour) +
                ':' +
                modifySingleDigit(lastResponseMinute) +
                '-0500',
            ) /
              1000 <
              Date.parse(
                modifySingleDigit(currentYear) +
                  '/' +
                  modifySingleDigit(currentMonth) +
                  '/' +
                  modifySingleDigit(currentDay) +
                  ' ' +
                  modifySingleDigit(surveyTimeSlots[i].endHour) +
                  ':' +
                  modifySingleDigit(surveyTimeSlots[i].endMinutes) +
                  '-0500',
              ) /
                1000 &&
            lastResponse.completed
          ) {
            alreadyResponse = true;
          } else {
            res.json({
              alreadyResponse,
              inTimeSlot,
            });
            break;
          }
          console.log(alreadyResponse);
          console.log(inTimeSlot);
        }
      }

      res.json({
        alreadyResponse,
        inTimeSlot,
      });
    }
  }),
);

module.exports = router;
