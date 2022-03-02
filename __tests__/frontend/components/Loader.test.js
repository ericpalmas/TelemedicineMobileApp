import 'react-native';
import React from 'react';
import Loader from '../../../frontend/components/Loader'
import renderer from 'react-test-renderer';


it('renders correctly', () => {
  const tree = renderer.create(<Loader />).toJSON();
  expect(tree).toMatchSnapshot();
});