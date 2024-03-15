import React from 'react';
import { render, MockScreen } from '../../../utils/test/test-navigation-setup';
import WorldClock from './index';
import { useWorldClock } from '../../../hooks';

const mockSetWorldClockItem = jest.fn();
const mockUpdateWorldClockList = jest.fn();
const mockDeleteWorldClockItem = jest.fn();
const mockToogleEditMode = jest.fn();

jest.mock('../../../hooks', () => ({
  useWorldClock: jest.fn(),
}));

const mockList = ['Europe/London', 'Asia/Tokyo', 'America/Sao_Paulo'];

const handleMockUseWorldClock = ({
  listData = mockList,
  editMode = false,
}: {
  listData?: string[];
  editMode?: boolean;
}) => {
  (useWorldClock as jest.Mock).mockImplementation(() => ({
    worldClockList: listData,
    worldClockEditMode: editMode,
    setWorldClockItem: mockSetWorldClockItem,
    updateWorldClockList: mockUpdateWorldClockList,
    deleteWorldClockItem: mockDeleteWorldClockItem,
    toogleEditMode: mockToogleEditMode,
  }));
};

describe('Render a WorldClock Screen', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    handleMockUseWorldClock({});
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  it('normal', () => {
    render(
      <MockScreen>
        <WorldClock />
      </MockScreen>,
    );
  });
});
