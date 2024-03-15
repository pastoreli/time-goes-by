import React from 'react';
import { Text } from 'react-native';
import { render } from '../../utils/test/test-setup';
import TextInput, { testIds } from '.';

describe('Render a TextInput', () => {
  it('normal', () => {
    render(<TextInput />);
  });
  it('Should render a multiline', () => {
    const { queryByTestId } = render(<TextInput multiline />);

    expect(queryByTestId(testIds.TEXT_INPUT_CONTAINER_MULTILINE)).toBeTruthy();
  });
  it('Should render with label', () => {
    const { queryByText } = render(<TextInput label="Test label" />);

    expect(queryByText('Test label')).toBeTruthy();
  });
  it('Should render with prepend element', () => {
    const { queryByText } = render(
      <TextInput prepend={<Text>Prepend text</Text>} />,
    );

    expect(queryByText('Prepend text')).toBeTruthy();
  });
  it('Should render with append element', () => {
    const { queryByText } = render(
      <TextInput append={<Text>Append text</Text>} />,
    );

    expect(queryByText('Append text')).toBeTruthy();
  });
  it('Should render with error message', () => {
    const { queryByText } = render(
      <TextInput touched errorMessage="Some error" />,
    );

    expect(queryByText('Some error')).toBeTruthy();
  });
});
