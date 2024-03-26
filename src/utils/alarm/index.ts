import syncStorage from '@react-native-async-storage/async-storage';
import {
  NotificationActionsGroup,
  NotificationId,
  StorageKeys,
} from '../../consts';
import { scheduleNotificationConfigProps } from '../notification';
import { Alarm } from '../../interfaces/alarm';
import {
  androidAlarmActions,
  androidSimpleStopActions,
} from '../lists/notifications';

export const updateAlarmStorageList = async (updatedList: Alarm[]) => {
  await syncStorage.setItem(
    StorageKeys.ALARM_LIST,
    JSON.stringify(updatedList),
  );
};

export const getAlarmStorageList = async (): Promise<Alarm[]> => {
  const storageList = await syncStorage.getItem(StorageKeys.ALARM_LIST);
  if (storageList) {
    return JSON.parse(storageList) as Alarm[];
  }
  return [];
};

export const updateAlarm = async (alarm: Alarm) => {
  const storageList = await getAlarmStorageList();
  if (storageList) {
    const newList = storageList.map(item =>
      item.id === alarm.id ? alarm : item,
    );
    await updateAlarmStorageList(newList);
  }
};

export const getAlarmStorage = async (alarmId: string) => {
  const storageList = await getAlarmStorageList();
  return storageList.find(item => item.id === alarmId);
};

export const getAlarmNotificationBody = (data: {
  id: string;
  dateTrigger: number;
  alarm: Alarm;
}): scheduleNotificationConfigProps => {
  return {
    title: 'Time Goes By',
    body: `Alarme: ${data.alarm.name}`,
    ios: {
      sound: data.alarm.sound.file,
      interruptionLevel: 'critical',
      critical: true,
      criticalVolume: 1,
      categoryId: data.alarm.snooze
        ? NotificationActionsGroup.ALARM
        : NotificationActionsGroup.SIMPLE_STOP,
    },
    android: {
      sound: data.alarm.sound.file,
      pressAction: {
        id: 'default',
      },
      actions: data.alarm.snooze
        ? androidAlarmActions
        : androidSimpleStopActions,
    },
    data: {
      id: data.id,
      catergoryId: NotificationId.ALARM,
      screen: 'AlarmTab',
      alarm: data.alarm,
      dateTrigger: data.dateTrigger,
    },
  };
};
