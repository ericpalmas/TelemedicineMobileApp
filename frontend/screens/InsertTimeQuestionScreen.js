import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectNavigationScreen} from '../utils/selectNavigationScreen';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {sendAnswers} from '../actions/surveyActions';

const InsertTimeQuestionScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [prev, setPrev] = React.useState('');
  const [next, setNext] = React.useState('');
  const [survey, setSurvey] = React.useState(route.params.survey);
  //const [answers, setAnswers] = React.useState(route.params.answers)
  const [hour, setHour] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);

  const PREV = 'PREV';
  const NEXT = 'NEXT';

  useEffect(() => {
    setPrev(
      selectNavigationScreen(route.params.index, route.params.survey, PREV),
    );
    setNext(
      selectNavigationScreen(route.params.index, route.params.survey, NEXT),
    );
  }, []);

  const submitHandler = e => {
    e.preventDefault();

    //if (hour === 0 && minutes === 0)
    route.params.answers[route.params.index] = {
      type: 'InsertTime',
      answer: hour + ':' + minutes,
    };

    const result = {
      survey: route.params.survey,
      answers: route.params.answers,
    };

    dispatch(sendAnswers(result)).then(() => {
      navigation.navigate('StartScreen', {
        completed: true,
      });
    });
  };

  const goToPreviousScreen = e => {
    e.preventDefault();
    route.params.answers[route.params.index] = {
      type: 'InsertTime',
      answer: hour + ':' + minutes,
    };
    navigation.navigate(prev, {
      index: route.params.index - 1,
      survey,
      answers: route.params.answers,
    });
  };

  const goToNextScreen = e => {
    e.preventDefault();
    route.params.answers[route.params.index] = {
      type: 'InsertTime',
      answer: hour + ':' + minutes,
    };
    navigation.navigate(next, {
      index: route.params.index + 1,
      survey,
      answers: route.params.answers,
    });
  };

  const decrementMinutes = () => {
    if (minutes == 0) {
      setMinutes(59);
    } else {
      setMinutes(minutes - 1);
    }
  };

  const incrementMinutes = () => {
    if (minutes == 59) {
      setMinutes(0);
    } else {
      setMinutes(minutes + 1);
    }
  };

  const decrementHour = () => {
    if (hour == 0) {
      setHour(23);
    } else {
      setHour(hour - 1);
    }
  };

  const incrementHour = () => {
    if (hour == 23) {
      setHour(0);
    } else {
      setHour(hour + 1);
    }
  };

  return (
    <View style={styles.containerMain}>
      {/* question text area*/}
      <View
        testID={'insertTimeQuestion'}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          marginTop: '8%',
        }}>
        <View>
          <Text
            style={{
              fontSize: 20,
            }}>
            {route.params.survey.questions[route.params.index].question.text}
          </Text>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View>
          <View style={styles.wrapperText}>
            <View
              testID="hour"
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingLeft: 70,
              }}>
              <Text style={styles.text}>{hour}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.text}>:</Text>
            </View>
            <View testID="minutes" style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.text}>{minutes}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <View style={{flex: 1, paddingRight: 2}}>
              <Button
                testID="decrementHour"
                onPress={decrementHour}
                title="-"
                style={{justifyContent: 'flex-start'}}
              />
            </View>
            <View style={{flex: 1, paddingRight: 10}}>
              <Button
                testID="incrementHour"
                onPress={incrementHour}
                title="+"
                style={{justifyContent: 'flex-start'}}
                color="#FF8C00"
              />
            </View>
            <View style={{flex: 1, paddingRight: 2}}>
              <Button
                testID="decrementMinutes"
                onPress={decrementMinutes}
                title="-"
                style={{justifyContent: 'flex-end'}}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                testID="incrementMinutes"
                onPress={incrementMinutes}
                title="+"
                style={{justifyContent: 'flex-end'}}
                color="#FF8C00"
              />
            </View>
          </View>
        </View>
      </View>

      {/* submit area*/}
      <View style={styles.bottomView}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button
              disabled={prev == '-1' ? true : false}
              title="<"
              onPress={goToPreviousScreen}
            />
          </View>
          <View style={styles.buttonContainer}>
            {route.params.index == route.params.survey.questions.length - 1 ? (
              <Button title="SALVA" onPress={submitHandler} />
            ) : (
              <Button
                disabled={next == '-1' ? true : false}
                title=">"
                onPress={goToNextScreen}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    top: 0,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'top',
  },

  textAreaContainer: {
    width: '80%',
    height: '60%',
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 4,
    marginHorizontal: 0,
    padding: 10,
    marginTop: 8,
    height: '70%',
    width: '80%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    padding: 4,
  },
  containerMain: {
    backgroundColor: '#FFCC99',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  centerButtons: {
    padding: 5,
    width: '35%',
    height: '20%',
  },
  mainButtonContainer: {
    flex: 1,
    padding: 4,
  },

  button: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: '30%',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },

  wrapperText: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '70%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 20,
  },
});

export default InsertTimeQuestionScreen;
