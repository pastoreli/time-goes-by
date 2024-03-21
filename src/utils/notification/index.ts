import notifee, {
  RepeatFrequency,
  TriggerType,
  Notification,
  EventDetail,
  AndroidImportance,
  AlarmType,
} from '@notifee/react-native';
import { ClockTimeType, clockTimeToInteger } from '../time';
import {
  getAlarmNotificationBody,
  getAlarmStorage,
  updateAlarm,
} from '../alarm';
import {
  AndroidChanels,
  NotificationActions,
  NotificationId,
} from '../../consts';
import dateUtils from '../date';
import { Alarm } from '../../interfaces/alarm';

export enum RepeatNotificatonType {
  ONLY_ONE = 1,
  ONLY_FOR_REPEAT = 2,
  ALL = 3,
}

const REPEAT_NOTIFICATION_NUMBER = 50;

export type scheduleNotificationTriggerProps = {
  date: number;
  repeat?: RepeatNotificatonType;
  repeatFrequency?: RepeatFrequency;
};

export type scheduleNotificationConfigProps = Omit<Notification, 'id'>;

export type scheduleNotificationProps = {
  id: string;
  chanelId: AndroidChanels;
  config: scheduleNotificationConfigProps;
  trigger: scheduleNotificationTriggerProps;
};

export type cancelScheduleNotificationsProps = {
  id: string;
  cancelOnllyFollowing?: boolean;
  repeat?: RepeatNotificatonType;
};

export const scheduleNotifications = async ({
  id,
  chanelId,
  config,
  trigger,
}: scheduleNotificationProps) => {
  const repeatType = trigger.repeat || RepeatNotificatonType.ONLY_ONE;
  const repeatCount =
    repeatType === RepeatNotificatonType.ONLY_ONE
      ? 1
      : REPEAT_NOTIFICATION_NUMBER;

  const channelId = await notifee.createChannel({
    id: chanelId,
    name: chanelId,
    vibration: true,
    sound: config.android?.sound?.replace('.mp3', ''),
    importance: AndroidImportance.HIGH,
  });

  for (
    let i = repeatType === RepeatNotificatonType.ONLY_FOR_REPEAT ? 1 : 0;
    i < repeatCount;
    i++
  ) {
    await notifee.createTriggerNotification(
      {
        id: i > 0 ? `${id}-${i}` : id,
        ...config,
        android: {
          ...config.android,
          sound: config.android?.sound?.replace('.mp3', ''),
          channelId,
          importance: AndroidImportance.HIGH,
        },
        data: {
          ...config.data,
          index: i,
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp:
          trigger.date + clockTimeToInteger(i * 7, ClockTimeType.SECONDS),
        repeatFrequency: i > 0 ? RepeatFrequency.NONE : trigger.repeatFrequency,
        alarmManager: {
          type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE,
        },
      },
    );
  }
};

export const cancelScheduleNotifications = ({
  id,
  repeat,
}: cancelScheduleNotificationsProps) => {
  const notificationsId: string[] = [];
  if (repeat !== RepeatNotificatonType.ONLY_ONE) {
    for (let i = 1; i < REPEAT_NOTIFICATION_NUMBER; i++) {
      notificationsId.push(`${id}-${i}`);
    }
  }
  if (repeat !== RepeatNotificatonType.ONLY_FOR_REPEAT) {
    notificationsId.push(id);
  }
  notifee.cancelAllNotifications(notificationsId);
};

export const dysplayNotification = async (
  title: string,
  description: string,
  chanel: AndroidChanels,
) => {
  const channelId = await notifee.createChannel({
    id: chanel,
    name: chanel,
    importance: AndroidImportance.HIGH,
  });
  await notifee.displayNotification({
    title: title,
    body: description,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
    },
  });
};

const handleTimerNotification = (notification: Notification) => {
  if (notification.data) {
    const data = notification.data;
    cancelScheduleNotifications({
      id: data.id as string,
      repeat: RepeatNotificatonType.ALL,
    });
  }
};

const handleCancelAlarmNotifications = async (alarmId: string) => {
  const alarmItem = await getAlarmStorage(alarmId);
  if (alarmItem) {
    alarmItem.active = false;
    alarmItem.notifications.forEach(item => {
      cancelScheduleNotifications({
        id: item.id,
        repeat: RepeatNotificatonType.ALL,
      });
    });
    await updateAlarm(alarmItem);
  }
};

const handleAlarmNotification = async (
  notification: Notification,
  snooze?: boolean,
) => {
  if (notification.data) {
    const data = notification.data;
    const alarmData = data.alarm as Alarm;
    let currentNotification = alarmData.notifications.find(
      item => item.id === data.id,
    );
    if (!currentNotification) {
      throw new Error('There is something wrong with notification data body.');
    }

    if (!snooze) {
      currentNotification.triggerDate += clockTimeToInteger(
        1,
        ClockTimeType.WEEKS,
      );
      alarmData.notifications[currentNotification.position] =
        currentNotification;
      const newPosition =
        currentNotification.position + 1 < alarmData.notifications.length
          ? currentNotification.position + 1
          : 0;
      currentNotification = alarmData.notifications[newPosition];
    }
    if (alarmData.repeat.length > 0 || snooze) {
      cancelScheduleNotifications({
        id: data.id as string,
        cancelOnllyFollowing: true,
        repeat: RepeatNotificatonType.ONLY_FOR_REPEAT,
      });
      scheduleNotifications({
        id: currentNotification.id,
        chanelId: AndroidChanels.ALARMS,
        config: getAlarmNotificationBody({
          id: currentNotification.id,
          alarm: alarmData,
          dateTrigger: currentNotification.triggerDate,
        }),
        trigger: {
          date: snooze
            ? dateUtils().valueOf() +
              clockTimeToInteger(1, ClockTimeType.MINUTES)
            : currentNotification.triggerDate,
          repeat: RepeatNotificatonType.ONLY_FOR_REPEAT,
        },
      });
      if (snooze) {
        dysplayNotification(
          'Time Goes By',
          'Seu alarme irá tocar novamente em 10 minutos!',
          AndroidChanels.SNOOZE,
        );
      }
    } else {
      await handleCancelAlarmNotifications(alarmData.id);
    }
  }
};

export const handleNotificationInteraction = async (detail: EventDetail) => {
  if (detail.notification?.data) {
    const data = detail.notification.data;
    if (data.catergoryId === NotificationId.TIMER) {
      handleTimerNotification(detail.notification);
    }
    if (data.catergoryId === NotificationId.ALARM) {
      const requestSnooze =
        detail.pressAction?.id === NotificationActions.SNOOZE;
      await handleAlarmNotification(detail.notification, requestSnooze);
    }
  }
};
