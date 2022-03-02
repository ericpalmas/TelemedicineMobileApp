import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, fireEvent, screen, act} from '@testing-library/react-native';
import QuestionContainer from '../../../frontend/components/QuestionsContainer';
import {Provider} from 'react-redux';
import store from '../../../frontend/store';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Testing react navigation', () => {
  const component = (
    <Provider store={store}>
      <QuestionContainer />
    </Provider>
  );

  test('check starting page', async () => {
    const {findByText, findAllByText, findByLabelText} = render(component);

    const header = await findByText('Press start button to start the survey');
    const button = await findByText('START');

    expect(header).toBeTruthy();
    expect(button).toBeTruthy();
  });
});
