import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render } from '../../utils/test/test-setup';
import BlockButton from './index';

describe('BlockButton Component', () => {
  test('normal', () => {
    const { getByTestId } = render(
      <BlockButton testID="SomeButtonTest">Press Me</BlockButton>,
    );
    expect(getByTestId('SomeButtonTest-text').children).toContain('Press Me');
  });
  test('on press', () => {
    let pressed = false;
    const { getByTestId } = render(
      <BlockButton testID="SomeButtonTest" onPress={() => (pressed = true)}>
        Press Me
      </BlockButton>,
    );
    fireEvent.press(getByTestId('SomeButtonTest'));
    expect(pressed).toBe(true);
  });
  test('append & prepend', () => {
    const { queryByText } = render(
      <BlockButton
        prepend={<Text>Prepend Text</Text>}
        append={<Text>Append Text</Text>}>
        Press Me
      </BlockButton>,
    );

    expect(queryByText('Prepend Text')).toBeTruthy();
    expect(queryByText('Append Text')).toBeTruthy();
  });
});
