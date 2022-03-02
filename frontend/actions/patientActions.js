import axios from 'axios';
import {
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_FAIL,
} from '../constants/patientConstants';

export const listPatients = () => async dispatch => {
  try {
    dispatch({type: PATIENT_LIST_REQUEST});
    //const {data} = await axios.get('http://192.168.1.103:5000/api/patients');
    const {data} = await axios.get(
      'https://telemedicinemobile.herokuapp.com/api/patients',
    );

    dispatch({
      type: PATIENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
