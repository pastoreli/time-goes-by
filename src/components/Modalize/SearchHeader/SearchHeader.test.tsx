import React from 'react';
import { fireEvent, render, within } from '../../../utils/test/test-setup';
import SearchHeader, { testIds } from './index';
import { testIds as testIdsTextInput } from '../../TextInput';

describe('Render a Modalize SearchHeader', () => {
  it('Normal', () => {
    render(<SearchHeader search="" onSearchChange={() => {}} />);
  });

  it('Should show title text', () => {
    const { queryByText } = render(
      <SearchHeader title="Some text" search="" onSearchChange={() => {}} />,
    );

    expect(queryByText('Some text')).toBeTruthy();
  });
  it('Should update search value', () => {
    let value = '';
    const { getByTestId } = render(
      <SearchHeader search="" onSearchChange={text => (value = text)} />,
    );

    const inputContainer = getByTestId(testIds.SEARCH_HEADER_INPUT);
    const input = within(inputContainer).getByTestId(
      testIdsTextInput.TEXT_INPUT_FIELD,
    );

    fireEvent.changeText(input, 'New text');

    expect(value).toBe('New text');
  });
  it('Should update search when press on erase button', () => {
    let value = 'Some text';
    const { getByTestId } = render(
      <SearchHeader search={value} onSearchChange={text => (value = text)} />,
    );

    const eraseButton = getByTestId(testIds.SEARCH_HEADER_ERASE);

    fireEvent.press(eraseButton);

    expect(value).toBe('');
  });
});
