import syncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../consts';
import { Stopwatch, StopwatchNormalized } from '../../interfaces/stopwatch';

const useStopwatch = () => {
  const handleSetStopwarch = (stopwatch: StopwatchNormalized) => {
    const now = new Date();
    const stopwatchBody: Stopwatch = {
      ...stopwatch,
      inactiveDate: now.valueOf(),
    };
    syncStorage.setItem(StorageKeys.STOPWATCH, JSON.stringify(stopwatchBody));
  };

  const findExistingStopwatch = async (): Promise<StopwatchNormalized> => {
    const storageStopwatch = await syncStorage.getItem(StorageKeys.STOPWATCH);
    if (storageStopwatch) {
      const stopWatch = JSON.parse(storageStopwatch) as Stopwatch;
      const now = new Date();
      const elapsedTime = now.valueOf() - stopWatch.inactiveDate;
      stopWatch.timer += stopWatch.paused ? 0 : elapsedTime;
      stopWatch.laps[0] += stopWatch.paused ? 0 : elapsedTime;
      return stopWatch;
    } else {
      return {
        timer: 0,
        paused: true,
        laps: [],
      };
    }
  };

  const clearStopwatch = () => {
    syncStorage.removeItem(StorageKeys.STOPWATCH);
  };

  return {
    setStopwatch: handleSetStopwarch,
    findExistingStopwatch,
    clearStopwatch,
  };
};

export default useStopwatch;
