import 'react-native';
import React from 'react';
import { render } from '../../../../utils/test/test-navigation-setup';
import WorldClockChooseList from './index';

describe('Render a WorldClockChooseList', () => {
  it('normal', () => {
    render(<WorldClockChooseList onChoose={() => {}} />);
  });
});
