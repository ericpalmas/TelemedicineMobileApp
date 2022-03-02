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
  TouchableOpacity,
  Image,
} from 'react-native';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import ImagePicker from '../utils/ImagePicker';
import {sendAnswers} from '../actions/surveyActions';

const RadioQuestionScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  var radio_props = [];
  route.params.survey.questions[route.params.index].answers.forEach(item =>
    radio_props.push({label: item.text, value: item._id, image: item.image}),
  );

  const [prev, setPrev] = React.useState('');
  const [next, setNext] = React.useState('');
  const [survey, setSurvey] = React.useState(route.params.survey);
  const [selected, setSelected] = React.useState(0);
  const [text, onChangeText] = React.useState(
    route.params.survey.questions[route.params.index].answers[0].text,
  );

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
      type: 'Radio',
      selected: selected,
      answer: text,
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
      type: 'Radio',
      selected: selected,
      answer: text,
    };
    setSelected(0);

    navigation.navigate(prev, {
      index: route.params.index - 1,
      survey,
      answers: route.params.answers,
    });
  };

  const goToNextScreen = e => {
    e.preventDefault();

    route.params.answers[route.params.index] = {
      type: 'Radio',
      selected: selected,
      answer: text,
    };
    setSelected(0);
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
        testID={'radioQuestion'}
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
        <RadioForm formHorizontal={false} animation={true}>
          {radio_props.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={selected === i}
                onPress={() => setSelected(i)}
                //onPress={() => setAnswer(i, obj)}
                borderWidth={1}
                buttonInnerColor={'#e74c3c'}
                buttonOuterColor={selected === i ? '#2196f3' : '#000'}
                buttonSize={20}
                buttonOuterSize={40}
                buttonStyle={{}}
                buttonWrapStyle={{marginLeft: 10}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={value => onChangeText(value)}
                labelStyle={{fontSize: 20, color: '#000000'}}
                labelWrapStyle={{}}
              />

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingLeft: 20,
                }}>
                <ImagePicker imageType={obj.image} />
              </View>
            </RadioButton>
          ))}
        </RadioForm>
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
  answerContainer: {
    alignItems: 'flex-start',
  },
  wrapper: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: '30%',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

export default RadioQuestionScreen;
