import { useState, useEffect, useCallback } from 'react';
import syncStorage from '@react-native-async-storage/async-storage';

enum storageKeys {
  WORLD_CLOCK_LIST = 'worldClockList',
}

const useWorldClockStorage = () => {
  const [list, setList] = useState<string[]>([]);

  const setWorldClockItem = (timeZone: string) => {
    if (!list.includes(timeZone)) {
      const newList = [...list, timeZone];

      syncStorage.setItem(
        storageKeys.WORLD_CLOCK_LIST,
        JSON.stringify(newList),
      );

      setList(newList);
    }
  };

  const initWorldClockItems = useCallback(async () => {
    const result = await syncStorage.getItem(storageKeys.WORLD_CLOCK_LIST);
    if (result) {
      setList(JSON.parse(result));
    }
  }, []);

  useEffect(() => {
    initWorldClockItems();
  }, [initWorldClockItems]);

  return {
    worldClockList: list,
    setWorldClockItem,
  };
};

export default useWorldClockStorage;
