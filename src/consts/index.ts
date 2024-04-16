import { ShortcutItem } from 'react-native-actions-shortcuts';

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
  SETTINGS_ONBOARDING = 'settingsOnboarding',
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

export enum IosNativeScreens {
  DO_NOT_DISTURB = 'App-Prefs:DO_NOT_DISTURB',
  TIME_GOES_BY_NOTIFICATION_SETTINGS = 'App-Prefs:NOTIFICATIONS_ID&path=com.igorpastoreli.myclock',
}

export enum AndroidNativeScreens {
  SETTINGS = 'android.settings.SETTINGS',
}

export enum OnboardingSections {
  INTRO = 0,
  ALLOW_NOTIFICATIONS = 1,
  DO_NOT_DISTURB = 2,
  ALLOW_ALARM_ANDROID = 3,
}

export const ShortCuts: { [key: string]: ShortcutItem } = {
  SET_ALARM: {
    type: 'set_alarm',
    title: 'Novo Alarme',
    shortTitle: 'Novo Alarme',
    iconName: 'ic_clock_plus',
    data: {
      screen: {
        name: 'AlarmTab',
        params: {
          openDefinitions: true,
        },
      },
    },
  },
  SET_TIMER: {
    type: 'set_timer',
    title: 'Iniciar Temporizador',
    shortTitle: 'Iniciar Temporizador',
    iconName: 'ic_timer',
    data: {
      screen: {
        name: 'TimerTab',
      },
    },
  },
  START_STOPWATCH: {
    type: 'start_stopwatch',
    title: 'Iniciar Cronômetro',
    shortTitle: 'Iniciar Cronômetro',
    iconName: 'ic_stopwatch_play',
    data: {
      screen: {
        name: 'StopwatchTab',
        params: {
          start: true,
        },
      },
    },
  },
  RESUME_STOPWATCH: {
    type: 'resume_stopwatch',
    title: 'Retomar Cronômetro',
    shortTitle: 'Retomar Cronômetro',
    iconName: 'ic_stopwatch_play',
    data: {
      screen: {
        name: 'StopwatchTab',
        params: {
          start: true,
        },
      },
    },
  },
  STOP_STOPWATCH: {
    type: 'stop_stopwatch',
    title: 'Parar Cronômetro',
    shortTitle: 'Parar Cronômetro',
    iconName: 'ic_stopwatch_pause',
    data: {
      screen: {
        name: 'StopwatchTab',
        params: {
          stop: true,
        },
      },
    },
  },
};
