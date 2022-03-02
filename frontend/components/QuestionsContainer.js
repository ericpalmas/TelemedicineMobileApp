import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OpenQuestionScreen from '../screens/OpenQuestionScreen'
import RadioQuestionScreen from '../screens/RadioQuestionScreen'
import CheckQuestionScreen from '../screens/CheckQuestionScreen'
import IncrementDecrementQuestionScreen from '../screens/IncrementDecrementQuestionScreen'
import InsertTimeQuestionScreen from '../screens/InsertTimeQuestionScreen'
import SliderQuestionScreen from '../screens/SliderQuestionScreen'
import TrueFalseQuestionScreen from '../screens/TrueFalseQuestionScreen'
import StartScreen from './StartScreen';

const Stack = createNativeStackNavigator();


const QuestionsContainer = () => {
    return (
        <>
            <NavigationContainer >
                <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false }} >
                    <Stack.Screen name="StartScreen" component={StartScreen} />
                    <Stack.Screen name="Open" component={OpenQuestionScreen} />
                    <Stack.Screen name="Radio" component={RadioQuestionScreen} />
                    <Stack.Screen name="Check" component={CheckQuestionScreen} />
                    <Stack.Screen name="IncrementDecrement" component={IncrementDecrementQuestionScreen} />
                    <Stack.Screen name="InsertTime" component={InsertTimeQuestionScreen} />
                    <Stack.Screen name="Slider" component={SliderQuestionScreen} />
                    <Stack.Screen name="TrueFalse" component={TrueFalseQuestionScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default QuestionsContainer