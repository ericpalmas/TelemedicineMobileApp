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

const OpenQuestionScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [prev, setPrev] = React.useState('');
  const [next, setNext] = React.useState('');
  const [survey, setSurvey] = React.useState(route.params.survey);
  const [text, onChangeText] = React.useState('');

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

    route.params.answers[route.params.index] = {type: 'Open', answer: text};

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
    route.params.answers[route.params.index] = {type: 'Open', answer: text};
    navigation.navigate(prev, {
      index: route.params.index - 1,
      survey,
      answers: route.params.answers,
    });
  };

  const goToNextScreen = e => {
    e.preventDefault();
    route.params.answers[route.params.index] = {type: 'Open', answer: text};
    navigation.navigate(next, {
      index: route.params.index + 1,
      survey,
      answers: route.params.answers,
    });

    console.log('next');
    console.log(next);
  };

  return (
    <View style={styles.containerMain}>
      {/* question text area*/}
      <View
        testID={'openQuestion'}
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

      {/* answer area*/}
      <View style={styles.textAreaContainer}>
        <SafeAreaView
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#CBC1C1',
            borderRadius: 5,
            borderWidth: 1,
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <TextInput
            testID="inputAnswer"
            value={text}
            onChangeText={onChangeText}
          />
        </SafeAreaView>
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
});

export default OpenQuestionScreen;
