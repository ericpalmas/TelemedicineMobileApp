import axios from 'axios';
import {
  SURVEY_REQUEST,
  SURVEY_SUCCESS,
  SURVEY_FAIL,
  SURVEY_SEND_ANSWERS_REQUEST,
  SURVEY_SEND_ANSWERS_SUCCESS,
  SURVEY_SEND_ANSWERS_FAIL,
} from '../constants/surveyConstants';

export const surveyDetails = id => async dispatch => {
  try {
    dispatch({type: SURVEY_REQUEST});

    // const {data} = await axios.get(
    //   `http://192.168.1.103:5000/api/surveys/patientSurvey/${id}`,
    // );

    const {data} = await axios.get(
      `https://telemedicinemobile.herokuapp.com/api/surveys/patientSurvey/${id}`,
    );

    dispatch({
      type: SURVEY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SURVEY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendAnswers = surveyAnswers => async dispatch => {
  try {
    dispatch({
      type: SURVEY_SEND_ANSWERS_REQUEST,
    });

    // const {data} = await axios.post(`http://192.168.1.103:5000/api/surveys/`, {
    //   surveyAnswers,
    // });

    const {data} = await axios.post(
      `https://telemedicinemobile.herokuapp.com//api/surveys/`,
      {
        surveyAnswers,
      },
    );

    dispatch({
      type: SURVEY_SEND_ANSWERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SURVEY_SEND_ANSWERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
