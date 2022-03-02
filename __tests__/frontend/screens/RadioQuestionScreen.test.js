import * as React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import store from '../../../frontend/store';
import RadioQuestionScreen from '../../../frontend/screens/RadioQuestionScreen';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Testing RadioQuestionScreen', () => {
  test('check radio question', async () => {
    const array = [{}, {}, {}, {}, {}, {}];

    const questions = [
      {
        answers: [
          {
            _id: '61541fbc024eab54a8450383',
            text: 'si',
            question: '60dd7fd77649b543c0b02e2d',
            image: 1,
            selected: false,
            __v: 0,
          },
          {
            _id: '61541fbc024eab54a8450385',
            text: 'no',
            question: '60dd7fd77649b543c0b02e2d',
            image: 4,
            selected: false,
            __v: 0,
          },
        ],
        question: {
          slider: false,
          trueFalse: false,
          incrementDecrement: false,
          insertTime: false,
          radio: true,
          check: false,
          open: false,
          _id: '60dd7fd77649b543c0b02e2d',
          text: 'Hai dormito bene?',
          survey: {
            _id: '60afc8ca1193ee3f00223c58',
            name: 'ciaooo mondo',
            description: 'vvvvvvvvv',
            createdAt: '2021-05-27T16:28:58.835Z',
            updatedAt: '2021-05-27T16:28:58.835Z',
            __v: 0,
          },
          createdAt: '2021-07-01T08:41:59.966Z',
          updatedAt: '2021-09-29T08:11:40.402Z',
          __v: 0,
        },
      },
    ];

    const route = {
      key: 'Open-xgMvVHIBGuHK4xW0hREyF',
      name: 'Radio',
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
        <RadioQuestionScreen route={route} />
      </Provider>
    );

    const {findByText, findAllByText, findByLabelText, getByTestId} =
      render(component);

    const openQuestion = await getByTestId('radioQuestion');
    expect(openQuestion).toBeTruthy();

    const questionText = await findByText('Hai dormito bene?');
    expect(questionText).toBeTruthy();

    const optionOneText = await findByText('si');
    // console.log(optionOneText.props);
    // console.log(optionOneText);

    expect(optionOneText).toBeTruthy();

    const optionTwoText = await findByText('no');
    expect(optionTwoText).toBeTruthy();
  });
});
