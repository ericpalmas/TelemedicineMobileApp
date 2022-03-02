import * as React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import store from '../../../frontend/store';
import OpenQuestionScreen from '../../../frontend/screens/OpenQuestionScreen';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Testing OpenQuestionScreen', () => {
  const array = [{}, {}, {}, {}, {}, {}];

  const questions = [
    {
      answers: [],
      question: {
        __v: 0,
        _id: '60dd7fc47649b543c0b02e2b',
        check: false,
        incrementDecrement: false,
        insertTime: false,
        open: true,
        radio: false,
        slider: false,
        trueFalse: false,
        text: 'Come ti chiami?',
        createdAt: '2021-07-01T08:41:40.029Z',
        updatedAt: '2021-09-29T08:11:10.124Z',
      },
    },
  ];

  const route = {
    key: 'Open-xgMvVHIBGuHK4xW0hREyF',
    name: 'Open',
    params: {
      answers: array,
      index: 0,
      survey: {
        doctorID: '60ac01c8c458a814c89b16de',
        patientID: '60ac01c8c458a814c89b16d5',
        survey: '60afc8ca1193ee3f00223c58',
        questions: questions,
      },
    },
  };

  const component = (
    <Provider store={store}>
      <OpenQuestionScreen route={route} />
    </Provider>
  );

  test('check open question', async () => {
    const {findByText, findAllByText, findByLabelText, getByTestId} =
      render(component);

    const openQuestion = await getByTestId('openQuestion');
    expect(openQuestion).toBeTruthy();

    const questionText = await findByText('Come ti chiami?');
    expect(questionText).toBeTruthy();
  });

  test('check input change', async () => {
    const {getByTestId} = render(component);

    const textInput = await getByTestId('inputAnswer');
    fireEvent.changeText(textInput, 'test');

    expect(textInput.props.value).toBe('test');
  });
});
