import * as React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import store from '../../../frontend/store';
import CheckQuestionScreen from '../../../frontend/screens/CheckQuestionScreen';
import renderer from 'react-test-renderer';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Testing CheckQuestionScreen', () => {
  const array = [{}, {}, {}, {}, {}, {}];

  const questions = [
    {
      answers: [
        {
          _id: '61541fe2024eab54a8450399',
          text: 'alcol',
          question: '60dd7fe87649b543c0b02e30',
          image: 5,
          selected: false,
          __v: 0,
        },
        {
          _id: '61541fe2024eab54a845039b',
          text: 'sigarette',
          question: '60dd7fe87649b543c0b02e30',
          image: 9,
          selected: false,
          __v: 0,
        },
      ],
      question: {
        slider: false,
        trueFalse: false,
        incrementDecrement: false,
        insertTime: false,
        radio: false,
        check: true,
        open: false,
        _id: '60dd7fe87649b543c0b02e30',
        text: 'Ho effettuato qualche sgarro?',
        survey: {
          _id: '60afc8ca1193ee3f00223c58',
          name: 'ciaooo mondo',
          description: 'vvvvvvvvv',
          createdAt: '2021-05-27T16:28:58.835Z',
          updatedAt: '2021-05-27T16:28:58.835Z',
          __v: 0,
        },
        createdAt: '2021-07-01T08:42:16.554Z',
        updatedAt: '2021-09-29T08:12:18.027Z',
        __v: 0,
      },
    },
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
    name: 'Check',
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
      <CheckQuestionScreen route={route} />
    </Provider>
  );

  test('check question', async () => {
    const {findByText, findAllByText, findByLabelText, getByTestId} =
      render(component);
    await act(async () => {
      const checCheckkQuestion = await getByTestId('checkQuestion');
      expect(checCheckkQuestion).toBeTruthy();

      const questionText = await findByText('Ho effettuato qualche sgarro?');
      expect(questionText).toBeTruthy();

      const optionOneText = await findByText('alcol');
      console.log(optionOneText.props);
      expect(optionOneText).toBeTruthy();

      const optionTwoText = await findByText('sigarette');
      expect(optionTwoText).toBeTruthy();
    });
  });

  it('prev and next button', () => {
    const {getByRole, getByText} = render(
      <Provider store={store}>
        <CheckQuestionScreen route={route} />
      </Provider>,
    );

    const next = getByText('>');
    const prev = getByText('>');

    expect(next).toBeTruthy();
    expect(prev).toBeTruthy();
  });
});
