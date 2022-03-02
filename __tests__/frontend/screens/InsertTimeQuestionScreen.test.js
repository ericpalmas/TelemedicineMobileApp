import * as React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import store from '../../../frontend/store';
import InsertTimeQuestionScreen from '../../../frontend/screens/InsertTimeQuestionScreen';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Testing InsertTimeQuestionScreen', () => {
  const array = [{}, {}, {}, {}, {}, {}];

  const questions = [
    {
      answers: [],
      question: {
        slider: false,
        trueFalse: false,
        incrementDecrement: false,
        insertTime: true,
        radio: false,
        check: false,
        open: false,
        _id: '60dd80237649b543c0b02e39',
        text: 'a che ora sei andato a letto?',
        survey: {
          _id: '60afc8ca1193ee3f00223c58',
          name: 'ciaooo mondo',
          description: 'vvvvvvvvv',
          createdAt: '2021-05-27T16:28:58.835Z',
          updatedAt: '2021-05-27T16:28:58.835Z',
          __v: 0,
        },
        createdAt: '2021-07-01T08:43:15.690Z',
        updatedAt: '2021-09-29T08:13:20.213Z',
        __v: 0,
      },
    },
  ];

  const route = {
    key: 'Open-xgMvVHIBGuHK4xW0hREyF',
    name: 'InsertTime',
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
      <InsertTimeQuestionScreen route={route} />
    </Provider>
  );

  test('insert time question', async () => {
    const {
      findByText,
      findAllByText,
      findByLabelText,
      getByTestId,
      getByLabelText,
    } = render(component);

    const insertTimeQuestion = await getByTestId('insertTimeQuestion');
    expect(insertTimeQuestion).toBeTruthy();

    const questionText = await findByText('a che ora sei andato a letto?');
    expect(questionText).toBeTruthy();

    const hourText = await getByTestId('hour');
    expect(hourText).toBeTruthy();

    const minutesText = await getByTestId('minutes');
    expect(minutesText).toBeTruthy();
  });

  test('increment/decrement hour is working', async () => {
    const {getByTestId, findByText} = render(component);

    const incrementHour = await getByTestId('incrementHour');
    const decrementHour = await getByTestId('decrementHour');

    // increment the hour by one
    fireEvent.press(incrementHour);

    const one = await findByText('1');
    expect(one).toBeTruthy();

    // increment the hour by one
    fireEvent.press(incrementHour);

    const two = await findByText('2');
    expect(two).toBeTruthy();

    // decrement the hour by one
    fireEvent.press(decrementHour);
    const againOne = await findByText('1');
    expect(againOne).toBeTruthy();
  });

  test('increment/decrement minutes is working', async () => {
    const {getByTestId, findByText} = render(component);

    const incrementMinutes = await getByTestId('incrementMinutes');
    const decrementMinutes = await getByTestId('decrementMinutes');

    // increment the hour by one
    fireEvent.press(incrementMinutes);

    const one = await findByText('1');
    expect(one).toBeTruthy();

    // increment the hour by one
    fireEvent.press(incrementMinutes);

    const two = await findByText('2');
    expect(two).toBeTruthy();

    // decrement the hour by one
    fireEvent.press(decrementMinutes);
    const againOne = await findByText('1');
    expect(againOne).toBeTruthy();
  });
});
