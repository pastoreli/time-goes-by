import 'react-native';
import React from 'react';
import { render } from '../../utils/test/test-navigation-setup';
import AlarmNavigator from './index';

describe('Render a AlarmNavigator', () => {
  it('normal', () => {
    render(<AlarmNavigator />);
  });
});
