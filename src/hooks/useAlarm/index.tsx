import { useCallback, useEffect, useState } from 'react';
import syncStorage from '@react-native-async-storage/async-storage';
import { Alarm } from '../../interfaces/alarm';
import { NotificationId, StorageKeys } from '../../consts';
import dateUtils from '../../utils/date';
import { RepeatFrequency } from '@notifee/react-native';
import {
  getAlarmNotificationBody,
  getAlarmStorageList,
  updateAlarmStorageList,
} from '../../utils/alarm';
import {
  RepeatNotificatonType,
  scheduleNotifications,
  cancelScheduleNotifications,
} from '../../utils/notification';

const useAlarm = () => {
  const [list, setList] = useState<Alarm[]>([]);
  const [editMode, setEditMode] = useState(false);

  const handleUpdateList = (updatedList: Alarm[]) => {
    updateAlarmStorageList(updatedList);
    setList(updatedList);
  };

  const cancelNotifications = (notificationsId: string[]) => {
    notificationsId.forEach(item => {
      cancelScheduleNotifications({
        id: item,
        repeat: RepeatNotificatonType.ALL,
      });
    });
  };

  const defineAlarmNotifications = (alarm: Alarm) => {
    const notificationsId: string[] = [];
    const now = dateUtils();
    let closestAlarmDateTime = dateUtils()
      .hour(alarm.hour)
      .minute(alarm.minute)
      .second(0);

    if (now.valueOf() > closestAlarmDateTime.valueOf()) {
      closestAlarmDateTime = closestAlarmDateTime.add(1, 'days');
    }

    if (alarm.repeat.length > 0) {
      const notificationDates = Array(7)
        .fill(closestAlarmDateTime.day())
        .reduce((result: dateUtils.Dayjs[], item, index) => {
          const weekNumber = item + index > 6 ? index - 7 + item : item + index;
          if (alarm.repeat.includes(weekNumber)) {
            const itemDate = closestAlarmDateTime.add(index, 'days');
            result.push(itemDate);
          }
          return result;
        }, []);
      notificationDates.forEach(item => {
        const weekName = item.format('ddd').toLowerCase();
        const notificationId = `${NotificationId.ALARM}-${alarm.id}-${weekName}`;
        notificationsId.push(notificationId);
        scheduleNotifications({
          id: notificationId,
          config: getAlarmNotificationBody({
            id: notificationId,
            dateTrigger: item.valueOf(),
            alarm,
          }),
          trigger: {
            date: item.valueOf(),
            repeatFrequency: RepeatFrequency.WEEKLY,
            repeat: RepeatNotificatonType.ALL,
          },
        });
      });
    } else {
      const notificationId = `${NotificationId.ALARM}-${alarm.id}`;
      notificationsId.push(notificationId);
      scheduleNotifications({
        id: notificationId,
        config: getAlarmNotificationBody({
          id: notificationId,
          dateTrigger: closestAlarmDateTime.valueOf(),
          alarm,
        }),
        trigger: {
          date: closestAlarmDateTime.valueOf(),
          repeat: RepeatNotificatonType.ALL,
        },
      });
    }

    return notificationsId;
  };

  const setAlarmItem = (alarm: Alarm) => {
    const alarmCopy = JSON.parse(JSON.stringify(alarm)) as Alarm;
    alarmCopy.notificationsId = defineAlarmNotifications(alarm);
    const newList = [...list, alarmCopy];
    handleUpdateList(newList);
  };

  const toogleActiveAlarm = (alarm: Alarm) => {
    let notificationsId = alarm.notificationsId;
    if (alarm.active) {
      cancelNotifications(alarm.notificationsId);
    } else {
      notificationsId = defineAlarmNotifications(alarm);
    }
    const newList = list.map(item => {
      const itemCopy = { ...item };
      if (item.id === alarm.id) {
        itemCopy.active = !itemCopy.active;
        itemCopy.notificationsId = notificationsId;
      }

      return itemCopy;
    });
    handleUpdateList(newList);
  };

  const updateAlarm = (alarm: Alarm) => {
    cancelNotifications(alarm.notificationsId);
    const alarmCopy: Alarm = JSON.parse(JSON.stringify(alarm));
    alarmCopy.notificationsId = defineAlarmNotifications(alarmCopy);
    alarmCopy.active = true;
    const newList = list.map(item =>
      item.id === alarmCopy.id ? alarmCopy : item,
    );
    handleUpdateList(newList);
  };

  const deleteAlarmItem = (alarm: Alarm) => {
    cancelNotifications(alarm.notificationsId);
    const newList = list.filter(item => item.id !== alarm.id);
    handleUpdateList(newList);
  };

  const toogleEditMode = () => {
    syncStorage.setItem(StorageKeys.ALARM_EDIT_MODE, (!editMode).toString());
    setEditMode(value => !value);
  };

  const initAlarmItems = useCallback(async () => {
    const storageList = await getAlarmStorageList();
    setList(storageList);

    const storageEditMode = await syncStorage.getItem(
      StorageKeys.ALARM_EDIT_MODE,
    );

    setEditMode(storageEditMode === 'true');
  }, []);

  const refetchAlarmList = () => {
    initAlarmItems();
  };

  useEffect(() => {
    initAlarmItems();
  }, [initAlarmItems]);

  return {
    alarmList: list,
    alarmEditMode: editMode,
    setAlarmItem,
    updateAlarmList: handleUpdateList,
    deleteAlarmItem,
    toogleEditMode,
    toogleActiveAlarm,
    updateAlarm,
    refetchAlarmList,
  };
};

export default useAlarm;
