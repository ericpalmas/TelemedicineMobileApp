import * as React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import store from '../../../frontend/store';
import TrueFalseQuestionScreen from '../../../frontend/screens/TrueFalseQuestionScreen';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Testing TrueFalseQuestionScreen', () => {
  test('check true false question', async () => {
    const array = [{}, {}, {}, {}, {}, {}];

    const questions = [
      {
        answers: [
          {
            _id: '6154200e024eab54a84503c5',
            text: '',
            question: '60dd80197649b543c0b02e36',
            image: -1,
            selected: false,
            __v: 0,
          },
          {
            _id: '6154200e024eab54a84503c7',
            text: '',
            question: '60dd80197649b543c0b02e36',
            image: -1,
            selected: false,
            __v: 0,
          },
        ],
        question: {
          slider: false,
          trueFalse: true,
          incrementDecrement: false,
          insertTime: false,
          radio: false,
          check: false,
          open: false,
          _id: '60dd80197649b543c0b02e36',
          text: 'ti sei svegliato durante la notte?',
          survey: {
            _id: '60afc8ca1193ee3f00223c58',
            name: 'ciaooo mondo',
            description: 'vvvvvvvvv',
            createdAt: '2021-05-27T16:28:58.835Z',
            updatedAt: '2021-05-27T16:28:58.835Z',
            __v: 0,
          },
          createdAt: '2021-07-01T08:43:05.281Z',
          updatedAt: '2021-09-29T08:13:02.303Z',
          __v: 0,
        },
      },
    ];

    const route = {
      key: 'Open-xgMvVHIBGuHK4xW0hREyF',
      name: 'TrueFalse',
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
        <TrueFalseQuestionScreen route={route} />
      </Provider>
    );

    const {findByText, findAllByText, findByLabelText, getByTestId} =
      render(component);

    const openQuestion = await getByTestId('trueFalseQuestion');

    expect(openQuestion).toBeTruthy();
  });
});
