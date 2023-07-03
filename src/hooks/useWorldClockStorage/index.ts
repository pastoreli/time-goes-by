import { useState, useEffect, useCallback } from 'react';
import syncStorage from '@react-native-async-storage/async-storage';

export enum storageKeys {
  WORLD_CLOCK_LIST = 'worldClockList',
  WORLD_CLOCK_EDIT_MODE = 'worldClockEditMode',
}

const useWorldClockStorage = () => {
  const [list, setList] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);

  const handleUpdateList = (updatedList: string[]) => {
    syncStorage.setItem(
      storageKeys.WORLD_CLOCK_LIST,
      JSON.stringify(updatedList),
    );

    setList(updatedList);
  };

  const setWorldClockItem = (timeZone: string) => {
    if (!list.includes(timeZone)) {
      const newList = [...list, timeZone];

      handleUpdateList(newList);
    }
  };

  const updateWorldClockList = (updatedList: string[]) => {
    handleUpdateList(updatedList);
  };

  const deleteWorldClockItem = (timeZone: string) => {
    const newList = list.filter(item => item !== timeZone);

    handleUpdateList(newList);
  };

  const toogleEditMode = () => {
    syncStorage.setItem(
      storageKeys.WORLD_CLOCK_EDIT_MODE,
      (!editMode).toString(),
    );
    setEditMode(value => !value);
  };

  const initWorldClockItems = useCallback(async () => {
    const storageList = await syncStorage.getItem(storageKeys.WORLD_CLOCK_LIST);
    if (storageList) {
      setList(JSON.parse(storageList));
    }

    const storageEditMode = await syncStorage.getItem(
      storageKeys.WORLD_CLOCK_EDIT_MODE,
    );

    setEditMode(storageEditMode === 'true');
  }, []);

  useEffect(() => {
    initWorldClockItems();
  }, [initWorldClockItems]);

  return {
    worldClockList: list,
    worldClockEditMode: editMode,
    setWorldClockItem,
    updateWorldClockList,
    deleteWorldClockItem,
    toogleEditMode,
  };
};

export default useWorldClockStorage;
