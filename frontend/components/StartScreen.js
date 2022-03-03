import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState, useCallback} from 'react';
import Message from './Message';
import Loader from './Loader';
import {StyleSheet, Text, Button, View} from 'react-native';
import {surveyDetails} from '../actions/surveyActions';
import {checkInTimeSlot} from '../actions/timeSlotActions';
import DeviceInfo from 'react-native-device-info';

const StartScreen = ({navigation, route}) => {
  //const {completed} = route.params;

  //var completed = route.params.completed !== undefined ? true : false;

  //const [update, setUpdate] = useState(false);
  var answers = [];

  const dispatch = useDispatch();

  const patientSurvey = useSelector(state => state.survey);
  const {loading, error, survey} = patientSurvey;

  const chekTimeSlot = useSelector(state => state.checkInTimeSlot);
  const {
    loading: loadingCheckTimeSlot,
    error: errorCheckTimeSlot,
    checkInTimeSlot: checkSlots,
  } = chekTimeSlot;

  const navigate = () => {
    if (checkSlots !== undefined) {
      if (!checkSlots.alreadyResponse && checkSlots.inTimeSlot) {
        answers = new Array(survey.questions.length).fill({});

        if (survey.questions[0].question.slider)
          navigation.navigate('Slider', {index: 0, survey, answers});
        if (survey.questions[0].question.trueFalse)
          navigation.navigate('TrueFalse', {index: 0, survey, answers});
        if (survey.questions[0].question.incrementDecrement)
          navigation.navigate('IncrementDecrement', {
            index: 0,
            survey,
            answers,
          });
        if (survey.questions[0].question.insertTime)
          navigation.navigate('InsertTime', {index: 0, survey, answers});
        if (survey.questions[0].question.radio)
          navigation.navigate('Radio', {index: 0, survey, answers});
        if (survey.questions[0].question.check)
          navigation.navigate('Check', {index: 0, survey, answers});
        if (survey.questions[0].question.open)
          navigation.navigate('Open', {index: 0, survey, answers});
      } else if (checkSlots.alreadyResponse) {
        alert('ALREADY ANSWERED IN THIS TIME SLOT');
        if (survey !== undefined) {
          var info = {
            surveyId: survey.survey,
            uniqueId: DeviceInfo.getUniqueId(),
          };
          dispatch(checkInTimeSlot(info));
          // .then(() => {
          //   setUpdate(true);
          // });
        }
      } else if (!checkSlots.inTimeSlot) {
        alert('AT THIS MOMENT YOU CANNOT ANSWER');
        if (survey !== undefined) {
          var info = {
            surveyId: survey.survey,
            uniqueId: DeviceInfo.getUniqueId(),
          };
          dispatch(checkInTimeSlot(info));
          // .then(() => {
          //   setUpdate(true);
          // });
        }
      }
    }
  };

  useEffect(() => {
    dispatch(surveyDetails(DeviceInfo.getUniqueId()));
  }, [dispatch, loading]);

  useEffect(() => {
    if (survey !== undefined) {
      var info = {
        surveyId: survey.survey,
        uniqueId: DeviceInfo.getUniqueId(),
      };
      dispatch(checkInTimeSlot(info));

      // .then(() => {
      //   setUpdate(true);
      // });
    }
  }, [dispatch, survey, route.params?.completed]);

  return (
    <View style={styles.containerMain}>
      {loading || loadingCheckTimeSlot ? (
        <Loader />
      ) : error ? (
        <>
          <Message variant="danger">{error} </Message>
          <View>
            <Text
              style={{
                fontSize: 13,
              }}>
              {DeviceInfo.getUniqueId()}
            </Text>
          </View>
        </>
      ) : errorCheckTimeSlot ? (
        <>
          <Message variant="danger">{errorCheckTimeSlot} </Message>
          <View>
            <Text
              style={{
                fontSize: 13,
              }}>
              {DeviceInfo.getUniqueId()}
            </Text>
          </View>
        </>
      ) : (
        <>
          <View
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
                  fontFamily: 'sans-serif-light',
                }}>
                Press start button to start the survey
              </Text>
            </View>
          </View>

          <View style={styles.wrapper}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <View style={{flex: 1}}>
                <Button
                  onPress={navigate}
                  style={styles.loginButton}
                  title="START"
                />
              </View>
            </View>
          </View>
        </>
      )}
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
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  wrapper: {
    padding: 10,
    width: '80%',
    height: '20%',
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

export default StartScreen;
