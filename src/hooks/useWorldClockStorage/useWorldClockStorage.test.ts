import { renderHook, waitFor } from '@testing-library/react-native';
import syncStorage from '@react-native-async-storage/async-storage';
import useWorldClockStorage, { storageKeys } from './';

const mockList = ['Europe/London', 'Asia/Tokyo', 'America/Sao_Paulo'];

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const handleAsynckStorageMock = ({
  list = mockList,
  editMode = false,
  emptyList = false,
}: {
  list?: string[];
  editMode?: boolean;
  emptyList?: boolean;
}) => {
  const mockGetData = {
    [storageKeys.WORLD_CLOCK_LIST]: emptyList
      ? undefined
      : JSON.stringify(list),
    [storageKeys.WORLD_CLOCK_EDIT_MODE]: editMode.toString(),
  };

  (syncStorage.getItem as jest.Mock).mockImplementation((value: storageKeys) =>
    Promise.resolve(mockGetData[value]),
  );
};

describe('useWorldClockStorage', () => {
  beforeEach(() => {
    handleAsynckStorageMock({});
    (syncStorage.setItem as jest.Mock).mockClear();
  });
  describe('worldClockList', () => {
    it('Should return a storage list', async () => {
      const { result } = renderHook(() => useWorldClockStorage());

      await waitFor(() => {
        expect(result.current.worldClockList).toMatchObject(mockList);
      });
    });
    it('Should return an empty list', async () => {
      handleAsynckStorageMock({ emptyList: true });
      const { result } = renderHook(() => useWorldClockStorage());

      await waitFor(() => {
        expect(result.current.worldClockList).toMatchObject([]);
      });
    });
  });
  describe('worldClockEditMode', () => {
    it('Should return edit mode status', async () => {
      const { result } = renderHook(() => useWorldClockStorage());

      await waitFor(() => {
        expect(result.current.worldClockEditMode).toBe(false);
      });
    });
  });
  describe('setWorldClockItem', () => {
    it('Shold add a new item to the storage list', async () => {
      const { result } = renderHook(() => useWorldClockStorage());

      await waitFor(() => {
        expect(result.current.worldClockList.length).not.toBe(0);
      });

      result.current.setWorldClockItem('America/Toronto');

      await waitFor(() => {
        expect(syncStorage.setItem).toBeCalledWith(
          storageKeys.WORLD_CLOCK_LIST,
          JSON.stringify([...mockList, 'America/Toronto']),
        );
      });
    });
    it('Sould not add a new item to the storage list, when it already exist', async () => {
      const { result } = renderHook(() => useWorldClockStorage());

      await waitFor(() => {
        expect(result.current.worldClockList.length).not.toBe(0);
      });

      result.current.setWorldClockItem(mockList[0]);

      await waitFor(() => {
        expect(syncStorage.setItem).not.toBeCalled();
      });
    });
  });
  describe('updateWorldClockList', () => {
    const mockNewList = ['America/Toronto', 'Europe/Paris'];
    it('Shold update the storage list with a new list', async () => {
      const { result } = renderHook(() => useWorldClockStorage());

      await waitFor(() => {
        expect(result.current.worldClockList.length).not.toBe(0);
      });

      result.current.updateWorldClockList(mockNewList);

      await waitFor(() => {
        expect(syncStorage.setItem).toBeCalledWith(
          storageKeys.WORLD_CLOCK_LIST,
          JSON.stringify(mockNewList),
        );
      });
    });
  });
  describe('deleteWorldClockItem', () => {
    it('Shold delte an item from storage list', async () => {
      const { result } = renderHook(() => useWorldClockStorage());

      await waitFor(() => {
        expect(result.current.worldClockList.length).not.toBe(0);
      });

      result.current.deleteWorldClockItem(mockList[1]);

      await waitFor(() => {
        expect(syncStorage.setItem).toBeCalledWith(
          storageKeys.WORLD_CLOCK_LIST,
          JSON.stringify([mockList[0], mockList[2]]),
        );
      });
    });
  });
  describe('toogleEditMode', () => {
    it('Shold toogle edit mode on', async () => {
      const { result } = renderHook(() => useWorldClockStorage());

      result.current.toogleEditMode();

      await waitFor(() => {
        expect(syncStorage.setItem).toBeCalledWith(
          storageKeys.WORLD_CLOCK_EDIT_MODE,
          true.toString(),
        );
      });
    });
    it('Shold toogle edit mode of', async () => {
      handleAsynckStorageMock({ editMode: true });
      const { result } = renderHook(() => useWorldClockStorage());

      await waitFor(() => {
        expect(result.current.worldClockEditMode).toBe(true);
      });

      result.current.toogleEditMode();

      await waitFor(() => {
        expect(syncStorage.setItem).toBeCalledWith(
          storageKeys.WORLD_CLOCK_EDIT_MODE,
          false.toString(),
        );
      });
    });
  });
});
