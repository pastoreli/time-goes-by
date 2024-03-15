import React from 'react';
import { fireEvent, render } from '../../utils/test/test-setup';
import SearchInput, { testIds } from './index';

describe('SearchInput Component', () => {
  test('normal', () => {
    render(<SearchInput />);
  });
  test('update value', () => {
    let value = '';
    const { getByTestId } = render(
      <SearchInput
        testID="SearchInput"
        value={value}
        onChangeText={val => (value = val)}
      />,
    );
    fireEvent.changeText(getByTestId('SearchInput'), 'Test');
    expect(value).toBe('Test');
  });
  test('on reset field press', () => {
    let value = 'Some text';
    const { getByTestId } = render(
      <SearchInput
        testID="SearchInput"
        value={value}
        onChangeText={val => (value = val)}
      />,
    );
    fireEvent.press(getByTestId(testIds.SEARCH_INPUT_ERASE));
    expect(value).toBe('');
  });
});
