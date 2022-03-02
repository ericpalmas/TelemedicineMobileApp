import * as React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import store from '../../../frontend/store';
import SliderQuestionScreen from '../../../frontend/screens/SliderQuestionScreen';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Testing SliderQuestionScreen', () => {
  test('check slider question', async () => {
    const array = [{}, {}, {}, {}, {}, {}];

    const questions = [
      {
        answers: [
          {
            _id: '61541ff3024eab54a84503af',
            text: '1',
            question: '60dd80057649b543c0b02e33',
            image: 5,
            selected: false,
            __v: 0,
          },
          {
            _id: '61541ff3024eab54a84503b1',
            text: '10',
            question: '60dd80057649b543c0b02e33',
            image: 5,
            selected: false,
            __v: 0,
          },
        ],
        question: {
          slider: true,
          trueFalse: false,
          incrementDecrement: false,
          insertTime: false,
          radio: false,
          check: false,
          open: false,
          _id: '60dd80057649b543c0b02e33',
          text: 'alcolici assunti in settimana',
          survey: {
            _id: '60afc8ca1193ee3f00223c58',
            name: 'ciaooo mondo',
            description: 'vvvvvvvvv',
            createdAt: '2021-05-27T16:28:58.835Z',
            updatedAt: '2021-05-27T16:28:58.835Z',
            __v: 0,
          },
          createdAt: '2021-07-01T08:42:45.098Z',
          updatedAt: '2021-09-29T08:12:35.808Z',
          __v: 0,
        },
      },
    ];

    const route = {
      key: 'Open-xgMvVHIBGuHK4xW0hREyF',
      name: 'Slider',
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
        <SliderQuestionScreen route={route} />
      </Provider>
    );

    const {findByText, findAllByText, findByLabelText, getByTestId} =
      render(component);

    const checkQuestion = await getByTestId('sliderQuestion');
    expect(checkQuestion).toBeTruthy();

    const questionText = await findByText('alcolici assunti in settimana');
    expect(questionText).toBeTruthy();

    const optionOneText = await findByText('1');
    expect(optionOneText).toBeTruthy();

    const optionTwoText = await findByText('10');
    expect(optionTwoText).toBeTruthy();
  });
});
