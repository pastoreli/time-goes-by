import 'react-native';
import React from 'react';
import { render } from '../../../../utils/test/test-navigation-setup';
import WorldClockList from './index';

describe('Render a WorldClock Screen', () => {
  it('normal', () => {
    render(<WorldClockList onChoose={() => {}} />);
  });
});
