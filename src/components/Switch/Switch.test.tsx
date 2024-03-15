import React from 'react';
import { render } from '../../utils/test/test-setup';
import Switch from './index';

describe('Card Component', () => {
  test('normal', () => {
    const { queryByTestId } = render(<Switch testID="SomeSwitch" />);
    expect(queryByTestId('SomeSwitch')).toBeTruthy();
  });
});
