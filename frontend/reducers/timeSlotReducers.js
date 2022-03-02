import {
    CHECK_IN_TIME_SLOT_REQUEST,
    CHECK_IN_TIME_SLOT_SUCCESS,
    CHECK_IN_TIME_SLOT_FAIL
} from '../constants/timeSlotConstants'

export const checkInTimeSlotReducer = (state = { checkInTimeSlot: {} }, action) => {
    switch (action.type) {
        case CHECK_IN_TIME_SLOT_REQUEST:
            return { loading: true, ...state }
        case CHECK_IN_TIME_SLOT_SUCCESS:
            return { loading: false, checkInTimeSlot: action.payload }
        case CHECK_IN_TIME_SLOT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}