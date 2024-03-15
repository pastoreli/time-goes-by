import { useState, useEffect, useCallback } from 'react';
import syncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../consts';
import { WorldClock } from '../../interfaces/worldClock';

const useWorldClock = () => {
  const [list, setList] = useState<WorldClock[]>([]);
  const [editMode, setEditMode] = useState(false);

  const handleUpdateList = (updatedList: WorldClock[]) => {
    syncStorage.setItem(
      StorageKeys.WORLD_CLOCK_LIST,
      JSON.stringify(updatedList),
    );

    setList(updatedList);
  };

  const setWorldClockItem = (data: WorldClock) => {
    if (!list.some(item => item.timeZone === data.timeZone)) {
      const newList = [...list, data];

      handleUpdateList(newList);
    }
  };

  const updateWorldClockList = (updatedList: WorldClock[]) => {
    handleUpdateList(updatedList);
  };

  const deleteWorldClockItem = (data: WorldClock) => {
    const newList = list.filter(item => item.timeZone !== data.timeZone);

    handleUpdateList(newList);
  };

  const toogleEditMode = () => {
    syncStorage.setItem(
      StorageKeys.WORLD_CLOCK_EDIT_MODE,
      (!editMode).toString(),
    );
    setEditMode(value => !value);
  };

  const initWorldClockItems = useCallback(async () => {
    const storageList = await syncStorage.getItem(StorageKeys.WORLD_CLOCK_LIST);
    if (storageList) {
      setList(JSON.parse(storageList));
    }

    const storageEditMode = await syncStorage.getItem(
      StorageKeys.WORLD_CLOCK_EDIT_MODE,
    );

    setEditMode(storageEditMode === 'true');
  }, []);

  const refetchWorldClockList = () => {
    initWorldClockItems();
  };

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
    refetchWorldClockList,
  };
};

export default useWorldClock;
