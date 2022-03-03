import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {surveyDetails} from './frontend/actions/surveyActions';
import DeviceInfo from 'react-native-device-info';
import QuestionsContainer from './frontend/components/QuestionsContainer';

function App() {
  // const dispatch = useDispatch();

  // const patientSurvey = useSelector(state => state.survey);
  // const {loading, error, survey} = patientSurvey;

  // useEffect(() => {
  //   dispatch(surveyDetails(DeviceInfo.getUniqueId()));
  // }, [dispatch]);

  return <QuestionsContainer />;
}

export default App;
