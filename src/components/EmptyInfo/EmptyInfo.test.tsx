import React from 'react';
import { fireEvent, render } from '../../utils/test/test-setup';
import EmptyInfo from './index';

describe('EmptyInfo Component', () => {
  test('normal', () => {
    const { queryByTestId, queryByText } = render(
      <EmptyInfo testID="SomeInfo" icon="test" title="Some Title" />,
    );
    expect(queryByTestId('SomeInfo')).toBeTruthy();
    expect(queryByText('Some Title')).toBeTruthy();
  });
  test('on action press', () => {
    let pressed = false;
    const { getByTestId, queryByText } = render(
      <EmptyInfo
        testID="SomeInfo"
        icon="test"
        title="Some Title"
        actionText="Some action"
        onActionPress={() => (pressed = true)}
      />,
    );

    expect(queryByText('Some action')).toBeTruthy();
    fireEvent.press(getByTestId('SomeInfo-action'));
    expect(pressed).toBe(true);
  });
});
