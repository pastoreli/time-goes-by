import React from 'react';
import { fireEvent, render } from '../../utils/test/test-setup';
import TabBar, { testIds } from './index';

const mockNavigate = jest.fn();

const mockNavigation: any = {
  navigate: mockNavigate,
};

const mockUseColorScheme = jest.fn();

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: mockUseColorScheme,
}));

describe('Render a TabBar', () => {
  beforeEach(() => {
    mockUseColorScheme.mockImplementation(() => 'light');
  });
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
      const { getByTestId } = render(
        <TabBar
          state={{ index: activeIndex } as any}
          navigation={mockNavigation}
          descriptors={{}}
          insets={{ bottom: 0, left: 0, right: 0, top: 0 }}
        />,
      );

      const button = getByTestId(`${testIds.TAB_BAR_ITEM}-${tabIndex}`);

      fireEvent.press(button);

      expect(mockNavigate).toHaveBeenCalledWith(tabName);
    };

    it('Should active the WorldClockTab tab', () => {
      testActiveTab(0, 'WorldClockTab', 1);
    });
    it('Should active the AlarmTab tab', () => {
      testActiveTab(1, 'AlarmTab');
    });
    it('Should active the StopwatchTab tab', () => {
      testActiveTab(2, 'StopwatchTab');
    });
    it('Should active the TimerTab tab', () => {
      testActiveTab(3, 'TimerTab');
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
            queryByTestId(`${testIds.TAB_BAR_ITEM}-${i}-active`),
          ).toBeTruthy();
        } else {
          expect(
            queryByTestId(`${testIds.TAB_BAR_ITEM}-${i}-active`),
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
  describe('dark mode', () => {
    beforeEach(() => {
      mockUseColorScheme.mockImplementation(() => 'dark');
    });
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
  });
});
