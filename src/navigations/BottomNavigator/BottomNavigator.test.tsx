import 'react-native';
import React from 'react';
import { render } from '../../utils/test/test-navigation-setup';
import BottomNavigator from './index';

describe('Render a BottomNavigator', () => {
  it('normal', () => {
    render(<BottomNavigator />);
  });
});
