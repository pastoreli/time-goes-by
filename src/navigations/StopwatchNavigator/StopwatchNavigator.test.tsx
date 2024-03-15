import 'react-native';
import React from 'react';
import { render } from '../../utils/test/test-navigation-setup';
import StopwatchNavigator from './index';

describe('Render a StopwatchNavigator', () => {
  it('normal', () => {
    render(<StopwatchNavigator />);
  });
});
