const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const patientRoutes = require('./routes/patientRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const timeSlotRoutes = require('./routes/timeSlotRoutes');

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.get('/', function (req, res) {
  res.status(200).json({message: 'telemedicine on'});
});
app.use('/api/patients', patientRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/timeSlots', timeSlotRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);
