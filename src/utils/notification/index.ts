import notifee, {
  RepeatFrequency,
  TriggerType,
  Notification,
  EventDetail,
} from '@notifee/react-native';
import { ClockTimeType, clockTimeToInteger } from '../time';
import {
  getAlarmNotificationBody,
  getAlarmStorage,
  updateAlarm,
} from '../alarm';
import { NotificationActions, NotificationId } from '../../consts';
import dateUtils from '../date';
import { Alarm } from '../../interfaces/alarm';

export enum RepeatNotificatonType {
  ONLY_ONE = 1,
  ONLY_FOR_REPEAT = 2,
  ALL = 3,
}

export type scheduleNotificationTriggerProps = {
  date: number;
  repeat?: RepeatNotificatonType;
  repeatFrequency?: RepeatFrequency;
};

export type scheduleNotificationConfigProps = Omit<Notification, 'id'>;

export type scheduleNotificationProps = {
  id: string;
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
  config,
  trigger,
}: scheduleNotificationProps) => {
  const repeatType = trigger.repeat || RepeatNotificatonType.ONLY_ONE;
  const repeatCount = repeatType === RepeatNotificatonType.ONLY_ONE ? 1 : 11;

  const channelId = await notifee.createChannel({
    id: id,
    name: id,
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
          channelId,
        },
        data: {
          ...config.data,
          index: i,
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: trigger.date + i * 7000,
        repeatFrequency: i > 0 ? RepeatFrequency.NONE : trigger.repeatFrequency,
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
    for (let i = 1; i < 11; i++) {
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
) => {
  const channelId = await notifee.createChannel({
    id: 'display',
    name: 'display',
  });
  await notifee.displayNotification({
    title: title,
    body: description,
    android: {
      channelId,
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
    alarmItem.notificationsId.forEach(item => {
      cancelScheduleNotifications({
        id: item,
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
    let newDateTrigger = data.dateTrigger as number;
    if (!snooze) {
      newDateTrigger += clockTimeToInteger(1, ClockTimeType.WEEKS);
    }
    if (alarmData.repeat.length > 0 || snooze) {
      cancelScheduleNotifications({
        id: data.id as string,
        cancelOnllyFollowing: true,
        repeat: RepeatNotificatonType.ONLY_FOR_REPEAT,
      });
      scheduleNotifications({
        id: data.id as string,
        config: getAlarmNotificationBody({
          id: data.id as string,
          alarm: alarmData,
          dateTrigger: newDateTrigger,
        }),
        trigger: {
          date: snooze
            ? dateUtils().valueOf() +
              clockTimeToInteger(10, ClockTimeType.MINUTES)
            : newDateTrigger,
          repeat: RepeatNotificatonType.ONLY_FOR_REPEAT,
        },
      });
      dysplayNotification(
        'Time Goes By',
        'Seu alarme irá tocar novamente em 10 minutos!',
      );
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
