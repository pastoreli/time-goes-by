export enum WeekDay {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export enum StorageKeys {
  WORLD_CLOCK_LIST = 'worldClockList',
  WORLD_CLOCK_EDIT_MODE = 'worldClockEditMode',
  ALARM_LIST = 'alarmList',
  ALARM_EDIT_MODE = 'alarmEditMode',
  TIMER = 'timer',
  LAST_SET_TIMER = 'lastSetTimer',
  STOPWATCH = 'stopwatch',
}

export enum NotificationId {
  ALARM = 'alarm',
  TIMER = 'timer',
}

export enum NotificationActionsGroup {
  SIMPLE_STOP = 'simpleStopActions',
  ALARM = 'alarmActions',
}
export enum NotificationActions {
  STOP = 'stopAction',
  SNOOZE = 'snoozeAction',
}

export enum AndroidChannels {
  ALARMS = 'Alarms',
  TIMERS = 'Timers',
  SNOOZE = 'Snooe',
}

export const AndroidChannelGroups = {
  ALARM: {
    id: 'ALARM',
    name: 'Alarm',
  },
  TIMER: {
    id: 'TIMER',
    name: 'Timer',
  },
};
