import React from 'react';
import { Vibration } from 'react-native';
import {
  act,
  fireEvent,
  render,
} from '../../../../utils/test/test-navigation-setup';
import dateUtil from '../../../../utils/date';
import WorldClockList, { testIds } from './';

const mockList = ['America/Sao_Paulo', 'Europe/London', 'Asia/Tokyo'];

describe('Render a WorldClockList', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-07-29T13:20:00'));
  });
  it('normal', () => {
    render(<WorldClockList list={mockList} />);
  });
  it('Should render each timezone time', () => {
    const { queryByText } = render(<WorldClockList list={mockList} />);

    mockList.forEach(item => {
      expect(
        queryByText(dateUtil().tz(item).format('HH:mm').replace(/^0+/, '')),
      ).toBeTruthy();
    });
  });
  it('Should change time automatically after one minute', async () => {
    const { queryByText } = render(<WorldClockList list={mockList} />);

    expect(queryByText('13:20')).toBeTruthy();

    await act(async () => {
      jest.advanceTimersByTime(1000 * 60);
    });

    expect(queryByText('13:21')).toBeTruthy();
  });
  it('Should delete a item', async () => {
    let calledOnDelete = '';
    const { getAllByTestId } = render(
      <WorldClockList
        list={mockList}
        editMode
        onDelete={item => (calledOnDelete = item)}
      />,
    );

    const deleteButton = getAllByTestId(testIds.DELETE_BUTON)[1];
    fireEvent.press(deleteButton);

    expect(calledOnDelete).toBe('Europe/London');
  });
  it('Should reorganize item', () => {
    Vibration.vibrate = jest.fn();

    const listEdit = ['Europe/London', 'Asia/Tokyo', 'America/Sao_Paulo'];
    let reorganizeCalled: string[] = [];

    const { getAllByTestId, getByTestId } = render(
      <WorldClockList
        list={mockList}
        editMode
        onListChange={list => (reorganizeCalled = list)}
      />,
    );

    const organizerButton = getAllByTestId(testIds.ORGANIZER_BUTTON)[0];
    act(() => {
      fireEvent(organizerButton, 'onLongPress');
    });

    expect(Vibration.vibrate).toBeCalled();

    const list = getByTestId(testIds.LIST);
    act(() => {
      fireEvent(list, 'onDragEnd', { data: listEdit });
    });

    expect(reorganizeCalled).toMatchObject(listEdit);
  });
});
