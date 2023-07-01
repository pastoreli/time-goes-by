import 'react-native';
import React from 'react';
import {
  fireEvent,
  render,
} from '../../../../utils/test/test-navigation-setup';
import WorldClockChooseList, { testIds } from './index';
import { timeZoneList } from '../../../../utils/lists/timeZone';

describe('Render a WorldClockChooseList', () => {
  it('Normal', () => {
    render(<WorldClockChooseList list={timeZoneList} onChoose={() => {}} />);
  });
  it('Should call onChoose', () => {
    let calledOnChoose = '';
    const { getAllByTestId } = render(
      <WorldClockChooseList
        list={timeZoneList}
        onChoose={data => (calledOnChoose = data)}
      />,
    );

    const item = getAllByTestId(testIds.ITEM)[0];
    fireEvent.press(item);

    expect(calledOnChoose).toBe(timeZoneList[0]);
  });
});
