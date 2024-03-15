import 'react-native';
import React from 'react';
import { render } from '../../utils/test/test-navigation-setup';
import WorldClockNavigator from './index';

describe('Render a WorldClockNavigator', () => {
  it('normal', () => {
    render(<WorldClockNavigator />);
  });
});
