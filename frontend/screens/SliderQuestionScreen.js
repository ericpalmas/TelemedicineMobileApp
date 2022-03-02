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
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import ImagePicker from '../utils/ImagePicker';
import {sendAnswers} from '../actions/surveyActions';

const SliderQuestionScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [sliderValue, setSliderValue] = useState(
    Math.trunc(
      (parseInt(
        route.params.survey.questions[route.params.index].answers[1].text,
      ) -
        parseInt(
          route.params.survey.questions[route.params.index].answers[0].text,
        )) /
        2,
    ),
  );

  const [prev, setPrev] = React.useState('');
  const [next, setNext] = React.useState('');
  const [survey, setSurvey] = React.useState(route.params.survey);
  //const [answers, setAnswers] = React.useState(route.params.answers)

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

    route.params.answers[route.params.index] = {
      type: 'Slider',
      answer: sliderValue,
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
      type: 'Slider',
      answer: sliderValue,
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
      type: 'Slider',
      answer: sliderValue,
    };
    navigation.navigate(next, {
      index: route.params.index + 1,
      survey,
      answers: route.params.answers,
    });
  };

  return (
    <View style={styles.containerMain}>
      {/* question text area*/}
      <View
        testID={'sliderQuestion'}
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
      <View style={{alignContent: 'center', alignItems: 'center'}}>
        <Text style={styles.text}>{sliderValue}</Text>
      </View>

      <View style={styles.wrapper}>
        <View>
          <View
            style={{
              width: '100%',
              height: '25%',
              flex: 1,
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignContent: 'flex-start',
              alignSelf: 'flex-start',
              padding: 30,
            }}>
            <View
              style={{
                flex: 1,
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <ImagePicker
                imageType={
                  route.params.survey.questions[route.params.index].answers[0]
                    .image
                }
              />
            </View>
            <View
              style={{
                flex: 1,
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.text}>
                {
                  route.params.survey.questions[route.params.index].answers[0]
                    .text
                }
              </Text>
            </View>

            <View
              style={{
                //flex: 1,
                alignContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Text style={styles.text}>
                {
                  route.params.survey.questions[route.params.index].answers[1]
                    .text
                }
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <ImagePicker
                imageType={
                  route.params.survey.questions[route.params.index].answers[1]
                    .image
                }
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: '25%',
            flex: 1,
            padding: 20,
            justifyContent: 'flex-end',
          }}>
          <Slider
            maximumValue={parseInt(
              route.params.survey.questions[route.params.index].answers[1].text,
            )}
            minimumValue={parseInt(
              route.params.survey.questions[route.params.index].answers[0].text,
            )}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
            step={1}
            value={sliderValue}
            onValueChange={sliderValue => setSliderValue(sliderValue)}
          />
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
              <Button onPress={submitHandler} title="SALVA" />
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
    //color: '#fff',
    fontSize: 18,
  },
  sliderContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    //width: 240, height: 250,
  },
  wrapper: {
    padding: 10,
    //backgroundColor: '#FFFFFF',
    width: '80%',
    height: '30%',
    alignItems: 'stretch',
    //justifyContent: 'flex-end',
  },

  wrapperText: {
    flexDirection: 'row',
    //backgroundColor: '#FFFFFF',
    width: '100%',
    height: '70%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 20,
  },
});

export default SliderQuestionScreen;
