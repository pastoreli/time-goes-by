import { useCallback, useEffect, useState } from 'react';
import syncStorage from '@react-native-async-storage/async-storage';
import { Alarm, AlarmNotification } from '../../interfaces/alarm';
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

  const cancelNotifications = (notifications: AlarmNotification[]) => {
    notifications.forEach(item => {
      cancelScheduleNotifications({
        id: item.id,
        repeat: RepeatNotificatonType.ALL,
      });
    });
  };

  const getAlarmNotifications = (alarm: Alarm) => {
    const now = dateUtils();
    let closestAlarmDateTime = dateUtils()
      .hour(alarm.hour)
      .minute(alarm.minute)
      .second(0);

    if (now.valueOf() > closestAlarmDateTime.valueOf()) {
      closestAlarmDateTime = closestAlarmDateTime.add(1, 'days');
    }

    if (alarm.repeat.length === 0) {
      return [
        {
          id: `${NotificationId.ALARM}-${alarm.id}`,
          position: 0,
          triggerDate: closestAlarmDateTime.valueOf(),
        },
      ];
    }

    return Array(7)
      .fill(closestAlarmDateTime.day())
      .reduce((result: AlarmNotification[], item, index) => {
        const weekNumber = item + index > 6 ? index - 7 + item : item + index;
        if (alarm.repeat.includes(weekNumber)) {
          const itemDate = closestAlarmDateTime.add(index, 'days');
          const weekName = itemDate.format('ddd').toLowerCase();
          const notificationId = `${NotificationId.ALARM}-${alarm.id}-${weekName}`;
          result.push({
            id: notificationId,
            position: index,
            triggerDate: itemDate.valueOf(),
          });
        }
        return result;
      }, []);
  };

  const defineAlarmNotifications = (alarm: Alarm) => {
    alarm.notifications.forEach(item => {
      scheduleNotifications({
        id: item.id,
        config: getAlarmNotificationBody({
          id: item.id,
          dateTrigger: item.triggerDate,
          alarm,
        }),
        trigger: {
          date: item.triggerDate,
          repeatFrequency:
            alarm.repeat.length > 0
              ? RepeatFrequency.WEEKLY
              : RepeatFrequency.NONE,
          repeat:
            item.position > 0
              ? RepeatNotificatonType.ONLY_ONE
              : RepeatNotificatonType.ALL,
        },
      });
    });
  };

  const setAlarmItem = (alarm: Alarm) => {
    const alarmCopy = JSON.parse(JSON.stringify(alarm)) as Alarm;
    // console.log('test: ', getAlarmNotifications(alarm));
    alarmCopy.notifications = getAlarmNotifications(alarm);
    defineAlarmNotifications(alarmCopy);
    const newList = [...list, alarmCopy];
    handleUpdateList(newList);
  };

  const toogleActiveAlarm = (alarm: Alarm) => {
    const alarmCopy = JSON.parse(JSON.stringify(alarm)) as Alarm;
    if (alarmCopy.active) {
      cancelNotifications(alarmCopy.notifications);
      alarmCopy.active = false;
    } else {
      alarmCopy.notifications = getAlarmNotifications(alarmCopy);
      alarmCopy.active = true;
    }
    defineAlarmNotifications(alarmCopy);
    const newList = list.map(item => {
      let itemCopy = { ...item };
      if (item.id === alarmCopy.id) {
        itemCopy = alarmCopy;
      }
      return itemCopy;
    });
    handleUpdateList(newList);
  };

  const updateAlarm = (alarm: Alarm) => {
    cancelNotifications(alarm.notifications);
    const alarmCopy: Alarm = JSON.parse(JSON.stringify(alarm));
    alarmCopy.active = true;
    alarmCopy.notifications = getAlarmNotifications(alarmCopy);
    defineAlarmNotifications(alarmCopy);
    const newList = list.map(item =>
      item.id === alarmCopy.id ? alarmCopy : item,
    );
    handleUpdateList(newList);
  };

  const deleteAlarmItem = (alarm: Alarm) => {
    cancelNotifications(alarm.notifications);
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
