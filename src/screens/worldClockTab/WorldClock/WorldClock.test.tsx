import 'react-native';
import React from 'react';
import {
  render,
  MockScreen,
  fireEvent,
} from '../../../utils/test/test-navigation-setup';
import WorldClock, { testIds } from './index';
import { testIds as listTestIds } from '../sections/WorldClockList';

describe('Render a WorldClock Screen', () => {
  it('normal', () => {
    render(
      <MockScreen>
        <WorldClock />
      </MockScreen>,
    );
  });
  it('Should open world clock list', () => {
    const { getByTestId, queryByTestId } = render(
      <MockScreen>
        <WorldClock />
      </MockScreen>,
    );

    const button = getByTestId(testIds.NAV_RIGHT_BUTTON);
    fireEvent.press(button);

    expect(queryByTestId(listTestIds.CONTAINER)).toBeTruthy();
  });
});
