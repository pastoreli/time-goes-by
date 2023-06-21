import React from 'react';
import { Platform } from 'react-native';
import { render } from '../../utils/test/test-setup';
import PressableArea, { testIds } from './index';

describe('Render a PressableArea', () => {
  describe('IOS', () => {
    beforeAll(() => {
      Platform.OS = 'ios';
    });
    it('normal', () => {
      const { queryByTestId } = render(<PressableArea>One text</PressableArea>);

      expect(queryByTestId(testIds.IOS_PRESSABLE)).toBeTruthy();
    });
  });
  describe('Android', () => {
    beforeAll(() => {
      Platform.OS = 'android';
    });
    it('normal', () => {
      const { queryByTestId } = render(<PressableArea>One text</PressableArea>);

      expect(queryByTestId(testIds.ANDROID_PRESSABLE)).toBeTruthy();
    });
  });
});
