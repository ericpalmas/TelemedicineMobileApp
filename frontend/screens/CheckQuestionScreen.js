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

import CheckBox from '@react-native-community/checkbox';
import ImagePicker from '../utils/ImagePicker';
import {sendAnswers} from '../actions/surveyActions';

const CheckQuestionScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [prev, setPrev] = React.useState('');
  const [next, setNext] = React.useState('');
  const [survey, setSurvey] = React.useState(route.params.survey);
  const [selectedItems, setSelectedItems] = useState(
    Array(
      route.params.survey.questions[route.params.index].answers.lenghth,
    ).fill(false),
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

    var checkBoxAnswers = [];
    selectedItems.forEach((item, i) => {
      if (item)
        checkBoxAnswers.push({
          selected: i,
          answer:
            route.params.survey.questions[route.params.index].answers[i].text,
        });
    });
    route.params.answers[route.params.index] = {
      type: 'Check',
      answers: checkBoxAnswers,
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
    var checkBoxAnswers = [];
    selectedItems.forEach((item, i) => {
      if (item)
        checkBoxAnswers.push({
          selected: i,
          answer:
            route.params.survey.questions[route.params.index].answers[i].text,
        });
    });
    route.params.answers[route.params.index] = {
      type: 'Check',
      answers: checkBoxAnswers,
    };

    // in case previous question is checkbox

    setSelectedItems(
      Array(
        route.params.survey.questions[route.params.index].answers.lenghth,
      ).fill(false),
    );

    navigation.navigate(prev, {
      index: route.params.index - 1,
      survey,
      answers: route.params.answers,
    });
  };

  const goToNextScreen = e => {
    e.preventDefault();

    var checkBoxAnswers = [];
    selectedItems.forEach((item, i) => {
      if (item)
        checkBoxAnswers.push({
          selected: i,
          answer:
            route.params.survey.questions[route.params.index].answers[i].text,
        });
    });
    route.params.answers[route.params.index] = {
      type: 'Check',
      answers: checkBoxAnswers,
    };

    // in case next question is again check box
    setSelectedItems(
      Array(
        route.params.survey.questions[route.params.index].answers.lenghth,
      ).fill(false),
    );

    navigation.navigate(next, {
      index: route.params.index + 1,
      survey,
      answers: route.params.answers,
    });
  };

  const handleInputChange = i => {
    const values = [...selectedItems];
    values[i] = !values[i];
    setSelectedItems(values);
  };

  return (
    <View style={styles.containerMain}>
      {/* question text area*/}
      <View
        testID={'checkQuestion'}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          marginTop: '8%',
          //backgroundColor: '#FFFFFF',
          paddingLeft: '5%',
          paddingRight: '5%',
          marginBottom: '10%',
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
      <View style={styles.cccc}>
        {route.params.survey.questions[route.params.index].answers.map(
          (obj, i) => (
            <View key={i}>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={selectedItems[i]}
                  onValueChange={() => handleInputChange(i)}
                  style={styles.checkbox}
                />
                <Text style={styles.label}>{obj.text}</Text>
                <ImagePicker imageType={obj.image} />
              </View>
            </View>
          ),
        )}
      </View>

      {/* <View style={styles.cccc}>
        <Text>Ciao</Text>
      </View> */}

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
  row: {
    paddingBottom: 5,
  },
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
    flexDirection: 'column',
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

  checkboxContainer: {
    marginBottom: 30,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    //paddingBottom: 10,
    width: '88%',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  // wrapper: {
  //   position: 'relative',
  //   padding: 10,
  //   backgroundColor: '#FFFFFF',
  //   width: '80%',
  //   height: '30%',
  //   alignItems: 'stretch',
  //   justifyContent: 'center',
  // },

  cccc: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: '70%',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: '10%',
    marginTop: '10%',
  },
});

export default CheckQuestionScreen;
