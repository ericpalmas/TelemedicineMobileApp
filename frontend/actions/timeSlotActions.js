import axios from 'axios';
import {
  CHECK_IN_TIME_SLOT_REQUEST,
  CHECK_IN_TIME_SLOT_SUCCESS,
  CHECK_IN_TIME_SLOT_FAIL,
} from '../constants/timeSlotConstants';

export const checkInTimeSlot = info => async dispatch => {
  try {
    dispatch({type: CHECK_IN_TIME_SLOT_REQUEST});

    // const {data} = await axios.put(
    //   `http://192.168.1.103:5000/api/timeSlots`,
    //   info,
    // );

    const {data} = await axios.put(
      `https://telemedicinemobile.herokuapp.com/api/timeSlots`,
      info,
    );

    dispatch({
      type: CHECK_IN_TIME_SLOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHECK_IN_TIME_SLOT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
