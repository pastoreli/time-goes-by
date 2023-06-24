import 'react-native';
import React from 'react';
import { render } from '../../../../utils/test/test-navigation-setup';
import WorldClockChooseList from './index';
import { timeZoneList } from '../../../../utils/lists/timeZone';

describe('Render a WorldClockChooseList', () => {
  it('normal', () => {
    render(<WorldClockChooseList list={timeZoneList} onChoose={() => {}} />);
  });
});
