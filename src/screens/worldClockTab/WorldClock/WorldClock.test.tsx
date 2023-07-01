import 'react-native';
import React from 'react';
import {
  render,
  MockScreen,
  fireEvent,
  act,
} from '../../../utils/test/test-navigation-setup';
import WorldClock, { testIds } from './index';
import { testIds as listChooseTestIds } from '../sections/WorldClockChooseList';
import { testIds as listTestIds } from '../sections/WorldClockList';
import { useWorldClockStorage } from '../../../hooks';
import { timeZoneList } from '../../../utils/lists/timeZone';

const mockSetWorldClockItem = jest.fn();
const mockUpdateWorldClockList = jest.fn();
const mockDeleteWorldClockItem = jest.fn();
const mockToogleEditMode = jest.fn();

jest.mock('../../../hooks', () => ({
  useWorldClockStorage: jest.fn(),
}));

const mockList = ['Europe/London', 'Asia/Tokyo', 'America/Sao_Paulo'];

const handleMockUseWorldClockStorage = ({
  listData = mockList,
  editMode = false,
}: {
  listData?: string[];
  editMode?: boolean;
}) => {
  (useWorldClockStorage as jest.Mock).mockImplementation(() => ({
    worldClockList: listData,
    worldClockEditMode: editMode,
    setWorldClockItem: mockSetWorldClockItem,
    updateWorldClockList: mockUpdateWorldClockList,
    deleteWorldClockItem: mockDeleteWorldClockItem,
    toogleEditMode: mockToogleEditMode,
  }));
};

describe('Render a WorldClock Screen', () => {
  beforeEach(() => {
    handleMockUseWorldClockStorage({});
  });
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

    expect(queryByTestId(listChooseTestIds.CONTAINER)).toBeTruthy();
  });

  it('Should call toogle edit mode', () => {
    const { getByTestId } = render(
      <MockScreen>
        <WorldClock />
      </MockScreen>,
    );

    const button = getByTestId(testIds.NAV_LEFT_BUTTON);
    fireEvent.press(button);

    expect(mockToogleEditMode).toBeCalled();
  });

  it('Should add a new time zone', () => {
    const { getByTestId, getAllByTestId } = render(
      <MockScreen>
        <WorldClock />
      </MockScreen>,
    );

    const button = getByTestId(testIds.NAV_RIGHT_BUTTON);
    fireEvent.press(button);

    const chooseItem = getAllByTestId(listChooseTestIds.ITEM)[1];
    fireEvent.press(chooseItem);

    expect(mockSetWorldClockItem).toBeCalledWith(timeZoneList[1]);
  });
  it('Should turn off edit mode when open time zone list choose', () => {
    handleMockUseWorldClockStorage({ editMode: true });
    const { getByTestId } = render(
      <MockScreen>
        <WorldClock />
      </MockScreen>,
    );

    const button = getByTestId(testIds.NAV_RIGHT_BUTTON);
    fireEvent.press(button);

    expect(mockToogleEditMode).toBeCalled();
  });
  it('Should delete a selected time zone', () => {
    handleMockUseWorldClockStorage({ editMode: true });
    const { getAllByTestId } = render(
      <MockScreen>
        <WorldClock />
      </MockScreen>,
    );

    const deleteButton = getAllByTestId(listTestIds.DELETE_BUTON)[0];
    fireEvent.press(deleteButton);

    expect(mockDeleteWorldClockItem).toBeCalledWith(mockList[0]);
  });
  it('Should rearrange the list', () => {
    handleMockUseWorldClockStorage({ editMode: true });

    const newList = ['Asia/Tokyo', 'America/Sao_Paulo', 'Europe/London'];

    const { getAllByTestId, getByTestId } = render(
      <MockScreen>
        <WorldClock />
      </MockScreen>,
    );

    act(() => {
      const organizerButton = getAllByTestId(listTestIds.ORGANIZER_BUTTON)[0];
      fireEvent(organizerButton, 'onLongPress');
    });

    const list = getByTestId(listTestIds.LIST);
    act(() => {
      fireEvent(list, 'onDragEnd', { data: newList });
    });

    expect(mockUpdateWorldClockList).toBeCalledWith(newList);
  });
});
