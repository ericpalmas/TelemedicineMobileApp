import * as React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import store from '../../../frontend/store';
import IncrementDecrementQuestionScreen from '../../../frontend/screens/IncrementDecrementQuestionScreen';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Testing IncrementDecrementQuestionScreen', () => {
  const array = [{}, {}, {}, {}, {}, {}];

  const questions = [
    {
      answers: [
        {
          _id: '61542034024eab54a84503f2',
          text: '',
          question: '60dd89aa63307952a844d922',
          image: 3,
          selected: false,
          __v: 0,
        },
      ],
      question: {
        slider: false,
        trueFalse: false,
        incrementDecrement: true,
        insertTime: false,
        radio: false,
        check: false,
        open: false,
        _id: '60dd89aa63307952a844d922',
        text: 'quante volte ti sei svegliato questa notte?',
        survey: {
          _id: '60afc8ca1193ee3f00223c58',
          name: 'ciaooo mondo',
          description: 'vvvvvvvvv',
          createdAt: '2021-05-27T16:28:58.835Z',
          updatedAt: '2021-05-27T16:28:58.835Z',
          __v: 0,
        },
        createdAt: '2021-07-01T09:23:54.435Z',
        updatedAt: '2021-09-29T08:13:40.648Z',
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
      <IncrementDecrementQuestionScreen route={route} />
    </Provider>
  );

  test('check increment decrement question', async () => {
    const {findByText, findAllByText, findByLabelText, getByTestId} =
      render(component);

    await act(async () => {
      const insertTimeQuestion = await getByTestId(
        'incrementDecrementQuestion',
      );
      expect(insertTimeQuestion).toBeTruthy();
    });
  });

  test('increment/decrement counter is working', async () => {
    const {getByTestId, findByText} = render(component);

    await act(async () => {
      const increment = await getByTestId('increment');
      const decrement = await getByTestId('decrement');

      // increment the hour by one
      fireEvent.press(increment);

      const one = await findByText('1');
      expect(one).toBeTruthy();

      // increment the hour by one
      fireEvent.press(increment);

      const two = await findByText('2');
      expect(two).toBeTruthy();

      // decrement the hour by one
      fireEvent.press(decrement);
      const againOne = await findByText('1');
      expect(againOne).toBeTruthy();
    });
  });
});
