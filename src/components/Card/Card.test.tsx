import React from 'react';
import { render } from '../../utils/test/test-setup';
import Card from './index';

describe('Card Component', () => {
  test('normal', () => {
    const { queryByTestId } = render(<Card testID="SomeCard">Press Me</Card>);
    expect(queryByTestId('SomeCard')).toBeTruthy();
  });
});
