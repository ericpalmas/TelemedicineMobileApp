import 'react-native';
import React from 'react';
import ErrorQuestion from '../../../frontend/components/ErrorQuestion';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<ErrorQuestion />).toJSON();
  expect(tree).toMatchSnapshot();
});
