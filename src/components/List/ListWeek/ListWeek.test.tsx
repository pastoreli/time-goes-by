import React from 'react';
import { fireEvent, render } from '../../../utils/test/test-setup';
import ListWeek, { testIds } from './index';
import { weekDayList } from '../../../utils/lists/calendar';
import { WeekDay } from '../../../consts';

describe('ListRingtones Component', () => {
  test('normal', () => {
    const { queryByTestId } = render(<ListWeek testID="list" value={[]} />);
    weekDayList.forEach((_, index) => {
      expect(queryByTestId(`list-${testIds.LIST_ITEM}-${index}`)).toBeTruthy();
    });
  });
  test('select items', () => {
    let selected: WeekDay | null = null;
    const { getByTestId } = render(
      <ListWeek
        testID="list"
        value={[]}
        onSelect={item => (selected = item)}
      />,
    );
    fireEvent.press(getByTestId(`list-${testIds.LIST_ITEM}-1`));
    expect(selected).toBe(weekDayList[1].value);
  });
  test('should show check icon when selected', () => {
    const { queryByTestId } = render(
      <ListWeek testID="list" value={[weekDayList[0].value]} />,
    );
    expect(queryByTestId(`list-${testIds.LIST_ITEM_CHECK}-0`)).toBeTruthy();
  });
});
