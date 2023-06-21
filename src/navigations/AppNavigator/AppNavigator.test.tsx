import 'react-native';
import React from 'react';
import { render } from '../../utils/test/test-navigation-setup';
import AppNavigator from './index';

describe('Render a AppNavigator', () => {
  it('normal', () => {
    render(<AppNavigator />);
  });
});
