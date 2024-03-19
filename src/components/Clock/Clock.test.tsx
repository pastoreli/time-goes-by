import React from 'react';
import { fireEvent, render } from '../../utils/test/test-setup';
import Clock, { testIds } from './index';
import { hour24List, zerotoSixty } from '../../utils/lists/clock';

describe('Clock Component', () => {
  test('normal', () => {
    const { queryByTestId } = render(
      <Clock
        testID="clockComp"
        itemsList={[hour24List, zerotoSixty, zerotoSixty]}
        values={[]}
        onChange={() => null}
      />,
    );
    expect(queryByTestId('clockComp')).toBeTruthy();
  });
  test('normal with 1 picker', () => {
    const { queryByTestId } = render(
      <Clock
        testID="clockComp"
        itemsList={[hour24List]}
        values={[]}
        onChange={() => null}
      />,
    );
    expect(queryByTestId('clockComp')).toBeTruthy();
  });
  test('normal with 2 pickers', () => {
    const { queryByTestId } = render(
      <Clock
        testID="clockComp"
        itemsList={[hour24List, zerotoSixty]}
        values={[]}
        onChange={() => null}
      />,
    );
    expect(queryByTestId('clockComp')).toBeTruthy();
  });
  test('should start with selected items', () => {
    const { queryByTestId } = render(
      <Clock
        testID="clockComp"
        itemsList={[hour24List, zerotoSixty, zerotoSixty]}
        values={[3, 4, 5]}
        onChange={() => null}
      />,
    );

    expect(
      queryByTestId(`clockComp-${testIds.CLOCK_PIKER_ITEM_VALUE}-0-3-selected`),
    ).toBeTruthy();
    expect(
      queryByTestId(`clockComp-${testIds.CLOCK_PIKER_ITEM_VALUE}-1-4-selected`),
    ).toBeTruthy();
    expect(
      queryByTestId(`clockComp-${testIds.CLOCK_PIKER_ITEM_VALUE}-2-5-selected`),
    ).toBeTruthy();
  });
  test('should select items', () => {
    let selectedValue: number | null = null;
    let selectedIndex: number | null = null;
    const { getByTestId } = render(
      <Clock
        testID="clockComp"
        itemsList={[hour24List, zerotoSixty, zerotoSixty]}
        values={[3, 4, 5]}
        onChange={(value, index) => {
          selectedValue = value;
          selectedIndex = index;
        }}
      />,
    );

    const picker1 = getByTestId(`clockComp-${testIds.CLOCK_PICKER}-0`);

    fireEvent(picker1, 'onValueChange', 6);
    expect(selectedValue).toBe(6);
    expect(selectedIndex).toBe(0);

    const picker2 = getByTestId(`clockComp-${testIds.CLOCK_PICKER}-1`);

    fireEvent(picker2, 'onValueChange', 20);
    expect(selectedValue).toBe(20);
    expect(selectedIndex).toBe(1);

    const picker3 = getByTestId(`clockComp-${testIds.CLOCK_PICKER}-2`);

    fireEvent(picker3, 'onValueChange', 40);
    expect(selectedValue).toBe(40);
    expect(selectedIndex).toBe(2);
  });
  it('should throw an error when itemsList length is bigger than 3', () => {
    expect(() =>
      render(
        <Clock
          testID="clockComp"
          itemsList={[hour24List, zerotoSixty, zerotoSixty, zerotoSixty]}
          values={[]}
          onChange={() => null}
        />,
      ),
    ).toThrow(
      'Clock component only accepts itemList of sizes equal to or less than size 3',
    );
  });
});
