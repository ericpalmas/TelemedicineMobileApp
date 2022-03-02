import {
    SURVEY_REQUEST,
    SURVEY_SUCCESS,
    SURVEY_FAIL,
    SURVEY_SEND_ANSWERS_REQUEST,
    SURVEY_SEND_ANSWERS_SUCCESS,
    SURVEY_SEND_ANSWERS_FAIL
} from '../constants/surveyConstants'

export const surveyReducer = (state = { survey: {} }, action) => {
    switch (action.type) {
        case SURVEY_REQUEST:
            return { loading: true, ...state }
        case SURVEY_SUCCESS:
            return { loading: false, survey: action.payload }
        case SURVEY_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// add new survey to database
export const surveyAnswersReducer = (state = {}, action) => {
    switch (action.type) {
        case SURVEY_SEND_ANSWERS_REQUEST:
            return {
                loading: true,
            }
        case SURVEY_SEND_ANSWERS_SUCCESS:
            return {
                loading: false,
                success: true,
                surveyAnswers: action.payload,
            }
        case SURVEY_SEND_ANSWERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}