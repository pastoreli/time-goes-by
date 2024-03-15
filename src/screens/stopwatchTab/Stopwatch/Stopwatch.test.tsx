import 'react-native';
import React from 'react';
import { render } from '../../../utils/test/test-navigation-setup';
import Stopwatch from './index';

describe('Render a Stopwatch Screen', () => {
  it('normal', () => {
    render(<Stopwatch />);
  });
});
