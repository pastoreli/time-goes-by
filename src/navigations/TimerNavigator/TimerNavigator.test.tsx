import 'react-native';
import React from 'react';
import { render } from '../../utils/test/test-navigation-setup';
import TimerNavigator from './index';

describe('Render a TimerNavigator', () => {
  it('normal', () => {
    render(<TimerNavigator />);
  });
});
