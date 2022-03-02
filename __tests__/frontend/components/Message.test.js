import 'react-native';
import React from 'react';
import Message from '../../../frontend/components/Message'
import renderer from 'react-test-renderer';


it('renders correctly', () => {
  const tree = renderer.create(<Message />).toJSON();
  expect(tree).toMatchSnapshot();
});