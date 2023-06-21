import 'react-native';
import React from 'react';
import { fireEvent, render } from '../../utils/test/test-setup';
import TabBar, { testIds } from './index';

const mockNavigate = jest.fn();

const mockNavigation: any = {
  navigate: mockNavigate,
};

describe('Render a TabBar', () => {
  it('normal', () => {
    render(
      <TabBar
        state={{ index: 0 } as any}
        navigation={mockNavigation}
        descriptors={{}}
        insets={{ bottom: 0, left: 0, right: 0, top: 0 }}
      />,
    );
  });
  describe('Active tab by click', () => {
    const testActiveTab = (
      tabIndex: number,
      tabName: string,
      activeIndex = 0,
    ) => {
      const { queryByTestId } = render(
        <TabBar
          state={{ index: activeIndex } as any}
          navigation={mockNavigation}
          descriptors={{}}
          insets={{ bottom: 0, left: 0, right: 0, top: 0 }}
        />,
      );

      const button = queryByTestId(`${testIds.TAB_BAR_ITEM}-${tabIndex}`);

      fireEvent.press(button);

      expect(mockNavigate).toBeCalledWith(tabName);
    };

    it('Should active the WorldClockTab tab', () => {
      testActiveTab(1, 'WorldClockTab', 2);
    });
    it('Should active the AlarmTab tab', () => {
      testActiveTab(2, 'AlarmTab');
    });
    it('Should active the StopwatchTab tab', () => {
      testActiveTab(3, 'StopwatchTab');
    });
    it('Should active the TimerTab tab', () => {
      testActiveTab(4, 'TimerTab');
    });
  });
  describe('Active tab by state', () => {
    const testActiveTab = (activeIndex: number) => {
      const { queryByTestId } = render(
        <TabBar
          state={{ index: activeIndex } as any}
          navigation={mockNavigation}
          descriptors={{}}
          insets={{ bottom: 0, left: 0, right: 0, top: 0 }}
        />,
      );

      for (let i = 0; i < 4; i++) {
        if (i === activeIndex) {
          expect(
            queryByTestId(`${testIds.TAB_BAR_ITEM}-${i + 1}-active`),
          ).toBeTruthy();
        } else {
          expect(
            queryByTestId(`${testIds.TAB_BAR_ITEM}-${i + 1}-active`),
          ).toBeFalsy();
        }
      }
    };
    it('Should active the WorldClockTab tab', () => {
      testActiveTab(0);
    });
    it('Should active the AlarmTab tab', () => {
      testActiveTab(1);
    });
    it('Should active the StopwatchTab tab', () => {
      testActiveTab(2);
    });
    it('Should active the TimerTab tab', () => {
      testActiveTab(3);
    });
  });
});
