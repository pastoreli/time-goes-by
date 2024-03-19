import { renderHook, waitFor } from '@testing-library/react-native';
import syncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../consts';
import useWorldClock from '.';
import { WorldClock } from '../../interfaces/worldClock';

const mockList: WorldClock[] = [
  {
    timeZone: 'Europe/London',
    text: 'Europa - Londres',
  },
  {
    timeZone: 'Asia/Tokyo',
    text: 'Ásia - Tóquio',
  },
  {
    timeZone: 'America/Sao_Paulo',
    text: 'América - São Paulo',
  },
];

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const handleAsynckStorageMock = ({
  list = mockList,
  editMode = false,
  emptyList = false,
}: {
  list?: WorldClock[];
  editMode?: boolean;
  emptyList?: boolean;
}) => {
  const mockGetData = {
    [StorageKeys.WORLD_CLOCK_LIST]: emptyList
      ? undefined
      : JSON.stringify(list),
    [StorageKeys.WORLD_CLOCK_EDIT_MODE]: editMode.toString(),
  };

  (syncStorage.getItem as jest.Mock).mockImplementation(
    (value: StorageKeys.WORLD_CLOCK_LIST | StorageKeys.WORLD_CLOCK_EDIT_MODE) =>
      Promise.resolve(mockGetData[value]),
  );
};

describe('useWorldClock', () => {
  beforeEach(() => {
    handleAsynckStorageMock({});
    (syncStorage.setItem as jest.Mock).mockClear();
  });
  describe('worldClockList', () => {
    it('Should return a storage list', async () => {
      const { result } = renderHook(() => useWorldClock());

      await waitFor(() => {
        expect(result.current.worldClockList).toMatchObject(mockList);
      });
    });
    it('Should return an empty list', async () => {
      handleAsynckStorageMock({ emptyList: true });
      const { result } = renderHook(() => useWorldClock());

      await waitFor(() => {
        expect(result.current.worldClockList).toMatchObject([]);
      });
    });
    it('Should refetch a storage list', async () => {
      const { result } = renderHook(() => useWorldClock());

      result.current.refetchWorldClockList();

      await waitFor(() => {
        expect(syncStorage.getItem).toHaveBeenCalledWith(
          StorageKeys.WORLD_CLOCK_LIST,
        );
      });
    });
  });
  describe('worldClockEditMode', () => {
    it('Should return edit mode status', async () => {
      const { result } = renderHook(() => useWorldClock());

      await waitFor(() => {
        expect(result.current.worldClockEditMode).toBe(false);
      });
    });
  });
  describe('setWorldClockItem', () => {
    it('Shold add a new item to the storage list', async () => {
      const newItem: WorldClock = {
        text: 'América - Toronto',
        timeZone: 'America/Toronto',
      };

      const { result } = renderHook(() => useWorldClock());

      await waitFor(() => {
        expect(result.current.worldClockList.length).not.toBe(0);
      });

      result.current.setWorldClockItem(newItem);

      await waitFor(() => {
        expect(syncStorage.setItem).toHaveBeenCalledWith(
          StorageKeys.WORLD_CLOCK_LIST,
          JSON.stringify([...mockList, newItem]),
        );
      });
    });
    it('Sould not add a new item to the storage list, when it already exist', async () => {
      const { result } = renderHook(() => useWorldClock());

      await waitFor(() => {
        expect(result.current.worldClockList.length).not.toBe(0);
      });

      result.current.setWorldClockItem(mockList[0]);

      await waitFor(() => {
        expect(syncStorage.setItem).not.toHaveBeenCalled();
      });
    });
  });
  describe('updateWorldClockList', () => {
    const mockNewList: WorldClock[] = [
      {
        text: 'América - Toronto',
        timeZone: 'America/Toronto',
      },
      {
        text: 'Europa - Paris',
        timeZone: 'Europe/Paris',
      },
    ];
    it('Shold update the storage list with a new list', async () => {
      const { result } = renderHook(() => useWorldClock());

      await waitFor(() => {
        expect(result.current.worldClockList.length).not.toBe(0);
      });

      result.current.updateWorldClockList(mockNewList);

      await waitFor(() => {
        expect(syncStorage.setItem).toHaveBeenCalledWith(
          StorageKeys.WORLD_CLOCK_LIST,
          JSON.stringify(mockNewList),
        );
      });
    });
  });
  describe('deleteWorldClockItem', () => {
    it('Shold delte an item from storage list', async () => {
      const { result } = renderHook(() => useWorldClock());

      await waitFor(() => {
        expect(result.current.worldClockList.length).not.toBe(0);
      });

      result.current.deleteWorldClockItem(mockList[1]);

      await waitFor(() => {
        expect(syncStorage.setItem).toHaveBeenCalledWith(
          StorageKeys.WORLD_CLOCK_LIST,
          JSON.stringify([mockList[0], mockList[2]]),
        );
      });
    });
  });
  describe('toogleEditMode', () => {
    it('Shold toogle edit mode on', async () => {
      const { result } = renderHook(() => useWorldClock());

      result.current.toogleEditMode();

      await waitFor(() => {
        expect(syncStorage.setItem).toHaveBeenCalledWith(
          StorageKeys.WORLD_CLOCK_EDIT_MODE,
          true.toString(),
        );
      });
    });
    it('Shold toogle edit mode of', async () => {
      handleAsynckStorageMock({ editMode: true });
      const { result } = renderHook(() => useWorldClock());

      await waitFor(() => {
        expect(result.current.worldClockEditMode).toBe(true);
      });

      result.current.toogleEditMode();

      await waitFor(() => {
        expect(syncStorage.setItem).toHaveBeenCalledWith(
          StorageKeys.WORLD_CLOCK_EDIT_MODE,
          false.toString(),
        );
      });
    });
  });
});
