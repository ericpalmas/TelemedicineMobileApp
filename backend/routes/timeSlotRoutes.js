const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const TimeSlot = require('../models/timeSlotModel');
const SurveyResponse = require('../models/surveyResponseModel');
const PatientDevice = require('../models/patientDeviceModel');

var macaddress = require('macaddress');
//var DeviceInfoModule = require('react-native-device-info');

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

    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth() + 1;
    var currentDay = today.getDate();
    var currentHour = today.getHours();
    var currentMinute = today.getMinutes();

    if (patientByMacAddress) {
      const lastResponse = await SurveyResponse.findOne({
        patient: patientByMacAddress.patient,
        survey: surveyId,
      }).sort({updatedAt: -1});
      const lastResponseDate = new Date(lastResponse.updatedAt);

      var lastResponseYear = lastResponseDate.getFullYear();
      var lastResponseMonth = lastResponseDate.getMonth() + 1;
      var lastResponseDay = lastResponseDate.getDate();
      var lastResponseHour = lastResponseDate.getHours();
      var lastResponseMinute = lastResponseDate.getMinutes();

      const surveyTimeSlots = await TimeSlot.find({survey: surveyId});

      var alreadyResponse = false;
      var inTimeSlot = false;

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
          }
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
