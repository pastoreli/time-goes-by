import { Text } from 'react-native';
import React from 'react';
import { render, fireEvent } from '../../utils/test/test-setup';
import Button from './index';

describe('Button Component', () => {
  test('normal', () => {
    const { getByTestId } = render(<Button>Press Me</Button>);
    expect(getByTestId('Button-Text').children).toContain('Press Me');
  });

  test('loading', () => {
    const { getByTestId } = render(<Button loading>Press Me</Button>);
    expect(getByTestId('Button-Loading')).toBeTruthy();
  });

  test('append & prepend', () => {
    const { getByTestId } = render(
      <Button
        block
        append={<Text testID="Append">Append</Text>}
        prepend={<Text testID="Prepend">Prepend</Text>}>
        Press Me
      </Button>,
    );
    expect(getByTestId('Button-Text').children).toContain('Press Me');
  });

  test('disabled', () => {
    let pressed = false;
    const handlePress = () => (pressed = true);
    const { getByTestId } = render(
      <Button onPress={handlePress} disabled={true}>
        Press Me
      </Button>,
    );
    fireEvent.press(getByTestId('Button'));
    expect(pressed).toBe(false);
    expect(getByTestId('Button-Text').children).toContain('Press Me');
  });

  test('outlined', () => {
    const { getByTestId } = render(<Button outlined>Press Me</Button>);
    fireEvent.press(getByTestId('Button'));
    expect(getByTestId('Button-Text').children).toContain('Press Me');
  });

  test('outlined with text color', () => {
    const { getByTestId } = render(
      <Button outlined textColor="#000">
        Press Me
      </Button>,
    );
    fireEvent.press(getByTestId('Button'));
    expect(getByTestId('Button-Text').children).toContain('Press Me');
  });

  test('set color', () => {
    const { toJSON } = render(<Button color="#f1f1f1">Press Me</Button>);
    const buttonBody = JSON.stringify(toJSON());
    expect(buttonBody.includes('#f1f1f1')).toBeTruthy();
  });
});
