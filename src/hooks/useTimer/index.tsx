import syncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../consts';
import { useState } from 'react';
import dateUtils from '../../utils/date';
import { Timer } from '../../interfaces/timer';

const useTimer = () => {
  const [curentTimer, setCurrentTimer] = useState<Timer>();

  const handleSetTimer = (timer: number, pause = false) => {
    const today = new Date();
    const endDate = dateUtils.addMilliseconds(today, timer);
    const timerBody: Timer = {
      endDate: endDate.valueOf(),
      paused: pause,
      lastTimer: timer,
      definedTimer: curentTimer?.definedTimer || timer,
    };
    syncStorage.setItem(StorageKeys.TIMER, JSON.stringify(timerBody));

    setCurrentTimer(timerBody);

    return timerBody;
  };

  const findExistingTimer = async () => {
    const storageTimer = await syncStorage.getItem(StorageKeys.TIMER);
    if (storageTimer) {
      const parsedTimer = JSON.parse(storageTimer) as Timer;
      if (parsedTimer.paused) {
        setCurrentTimer(parsedTimer);
        return parsedTimer;
      } else {
        const now = new Date();

        const lastTimer = parsedTimer.endDate - now.valueOf();
        const timer = {
          ...parsedTimer,
          lastTimer: lastTimer,
        };
        if (lastTimer > 0) {
          setCurrentTimer(timer);
          return timer;
        } else {
          clearTimer();
          return undefined;
        }
      }
    }
  };

  const clearTimer = () => {
    setCurrentTimer(undefined);
    syncStorage.removeItem(StorageKeys.TIMER);
  };

  const setLastSetTimer = (timer: number) => {
    syncStorage.setItem(StorageKeys.LAST_SET_TIMER, timer.toString());
  };

  const getLastSetTimer = async () => {
    const lastSetTimer = await syncStorage.getItem(StorageKeys.LAST_SET_TIMER);
    return lastSetTimer ? parseInt(lastSetTimer, 10) : 0;
  };

  return {
    timer: curentTimer,
    setTimer: handleSetTimer,
    findExistingTimer,
    clearTimer,
    setLastSetTimer,
    getLastSetTimer,
  };
};

export default useTimer;
