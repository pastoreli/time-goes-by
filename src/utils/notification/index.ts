import notifee, {
  RepeatFrequency,
  TriggerType,
  Notification,
  EventDetail,
  AndroidImportance,
  AlarmType,
  AndroidCategory,
  AndroidChannelGroup,
  AndroidChannel,
} from '@notifee/react-native';
import { ClockTimeType, clockTimeToInteger } from '../time';
import {
  getAlarmNotificationBody,
  getAlarmStorage,
  updateAlarm,
} from '../alarm';
import {
  AndroidChannelGroups,
  AndroidChannels,
  NotificationActions,
  NotificationId,
} from '../../consts';
import { Alarm } from '../../interfaces/alarm';
import { Platform } from 'react-native';

export enum RepeatNotificatonType {
  ONLY_ONE = 1,
  ONLY_FOR_REPEAT = 2,
  ALL = 3,
}

const REPEAT_NOTIFICATION_NUMBER = 50;

export type ScheduleNotificationTriggerProps = {
  date: number;
  repeat?: RepeatNotificatonType;
  repeatFrequency?: RepeatFrequency;
};

export type ScheduleNotificationConfigProps = Omit<Notification, 'id'>;

export type ScheduleNotificationChanelProps = {
  channelId: string;
  channelName: string;
  channelGroupId: string;
  channelGroupName: string;
};

export type ScheduleNotificationProps = {
  id: string;
  channel: ScheduleNotificationChanelProps;
  config: ScheduleNotificationConfigProps;
  trigger: ScheduleNotificationTriggerProps;
};

export type cancelScheduleNotificationsProps = {
  id: string;
  repeat?: RepeatNotificatonType;
  deleteChannelId?: string;
};

export const createChannelGroup = async (data: AndroidChannelGroup) => {
  const currentGroup = Boolean(await notifee.getChannelGroup(data.id));
  if (!currentGroup) {
    await notifee.createChannelGroup(data);
  }
  return data.id;
};

export const deleteChannel = async (id: string) => {
  await notifee.deleteChannel(id);
};

export const createChannel = async (data: AndroidChannel) => {
  const currentChannel = Boolean(await notifee.getChannel(data.id));

  if (!currentChannel) {
    await notifee.createChannel(data);
  }

  return data.id;
};

export const scheduleNotifications = async ({
  id,
  channel,
  config,
  trigger,
}: ScheduleNotificationProps) => {
  const repeatType = trigger.repeat || RepeatNotificatonType.ONLY_ONE;
  const repeatCount =
    repeatType === RepeatNotificatonType.ONLY_ONE
      ? 1
      : REPEAT_NOTIFICATION_NUMBER;

  const channelGroupId = await createChannelGroup({
    id: channel.channelGroupId,
    name: channel.channelGroupName,
  });

  const channelId = await createChannel({
    id: channel.channelId,
    name: channel.channelName,
    groupId: channelGroupId,
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
          loopSound: true,
          category: AndroidCategory.ALARM,
          fullScreenAction: {
            id: 'default',
          },
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
          type: AlarmType.SET_ALARM_CLOCK,
        },
      },
    );
  }
};

export const cancelScheduleNotifications = ({
  id,
  repeat,
  deleteChannelId,
}: cancelScheduleNotificationsProps) => {
  if (deleteChannelId) {
    deleteChannel(deleteChannelId);
  }

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
  chanel: AndroidChannels,
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
      if (Platform.OS === 'ios') {
        cancelScheduleNotifications({
          id: data.id as string,
          repeat: RepeatNotificatonType.ONLY_FOR_REPEAT,
        });
      }

      if (Platform.OS === 'ios' || snooze) {
        scheduleNotifications({
          id: currentNotification.id,
          channel: {
            channelGroupId: AndroidChannelGroups.ALARM.id,
            channelGroupName: AndroidChannelGroups.ALARM.name,
            channelId: alarmData.androidChanelId,
            channelName: alarmData.androidChanelId,
          },
          config: getAlarmNotificationBody({
            id: currentNotification.id,
            alarm: alarmData,
            dateTrigger: currentNotification.triggerDate,
          }),
          trigger: {
            date: snooze
              ? new Date().valueOf() +
                clockTimeToInteger(10, ClockTimeType.MINUTES)
              : currentNotification.triggerDate,
            repeat:
              Platform.OS === 'ios'
                ? RepeatNotificatonType.ONLY_FOR_REPEAT
                : RepeatNotificatonType.ONLY_ONE,
          },
        });
      }
      if (snooze) {
        dysplayNotification(
          'Time Goes By',
          'Seu alarme irá tocar novamente em 10 minutos!',
          AndroidChannels.SNOOZE,
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
