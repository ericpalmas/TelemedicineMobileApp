import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
    patientListReducer,
} from './reducers/patientReducers'
import {
    surveyReducer,
    surveyAnswersReducer
} from './reducers/surveyReducers'
import {
    checkInTimeSlotReducer
} from './reducers/timeSlotReducers'


const middleware = [thunk]

const reducer = combineReducers({
    patientList: patientListReducer,
    survey: surveyReducer,
    surveyAnswers: surveyAnswersReducer,
    checkInTimeSlot: checkInTimeSlotReducer
})

const initialState = {}


const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware),
)


module.exports = store