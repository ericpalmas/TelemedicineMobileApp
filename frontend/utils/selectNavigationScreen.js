export function selectNavigationScreen(index, survey, type) {
    if (type === "PREV") {
        if (index - 1 >= 0 && index - 1 < survey.questions.length) {
            if (survey.questions[index - 1].question.slider)
                return "Slider"
            if (survey.questions[index - 1].question.trueFalse)
                return "TrueFalse"
            if (survey.questions[index - 1].question.incrementDecrement)
                return "IncrementDecrement"
            if (survey.questions[index - 1].question.insertTime)
                return "InsertTime"
            if (survey.questions[index - 1].question.radio)
                return "Radio"
            if (survey.questions[index - 1].question.check)
                return "Check"
            if (survey.questions[index - 1].question.open)
                return "Open"
        } else {
            return "-1"
        }
    } else if (type === "NEXT") {
        if (index + 1 >= 0 && index + 1 < survey.questions.length) {
            if (survey.questions[index + 1].question.slider)
                return "Slider"
            if (survey.questions[index + 1].question.trueFalse)
                return "TrueFalse"
            if (survey.questions[index + 1].question.incrementDecrement)
                return "IncrementDecrement"
            if (survey.questions[index + 1].question.insertTime)
                return "InsertTime"
            if (survey.questions[index + 1].question.radio)
                return "Radio"
            if (survey.questions[index + 1].question.check)
                return "Check"
            if (survey.questions[index + 1].question.open)
                return "Open"
        } else {
            return "-1"
        }
    }
};