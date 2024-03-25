import React from 'react';
import { fireEvent, render } from '../../../utils/test/test-setup';
import ListRingtones, { testIds } from './index';
import { alarmSounds } from '../../../utils/lists/sound';
import { Sound } from '../../../interfaces/sound';

const mockPlaySound = jest.fn();
const mockStopSound = jest.fn();

jest.mock('../../../hooks', () => ({
  useSound: () => ({
    playSound: mockPlaySound,
    stopSound: mockStopSound,
  }),
}));

describe('ListRingtones Component', () => {
  beforeEach(() => {
    mockPlaySound.mockClear();
    mockStopSound.mockClear();
  });
  test('normal', () => {
    const { queryByText } = render(<ListRingtones value={alarmSounds[0]} />);
    alarmSounds.forEach(item => {
      expect(queryByText(item.name)).toBeTruthy();
    });
  });
  test('select sound', () => {
    let selected: Sound | null = null;
    const { getByTestId } = render(
      <ListRingtones
        testID="list"
        value={alarmSounds[0]}
        onSelect={item => (selected = item)}
      />,
    );
    fireEvent.press(getByTestId(`list-${testIds.LIST_ITEM}-1`));
    expect(selected).toMatchObject(alarmSounds[1]);
  });
  test('should play sound after pressed item', async () => {
    const { getByTestId } = render(
      <ListRingtones testID="list" value={alarmSounds[0]} />,
    );
    fireEvent.press(getByTestId(`list-${testIds.LIST_ITEM}-0`));
    expect(mockPlaySound).toHaveBeenCalledWith(alarmSounds[0].file);
  });
  test('should stop sound when unmonted', () => {
    const { getByTestId, unmount } = render(
      <ListRingtones testID="list" value={alarmSounds[0]} />,
    );
    fireEvent.press(getByTestId(`list-${testIds.LIST_ITEM}-0`));
    unmount();
    expect(mockStopSound).toHaveBeenCalled();
  });
});
