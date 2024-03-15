import { Alarm } from './src/interfaces/alarm';

export type RootStack = {
  BottomNaviagtor: undefined;
};

export type BottomNavigatorRoutes = {
  WorldClockTab: undefined;
  AlarmTab: undefined;
  StopwatchTab: undefined;
  TimerTab: undefined;
};

export type WorldClockNavigatorRoutes = {
  WorldClock: undefined;
  WorldClockChooseModal: undefined;
};

export type WorldClockChooseRoutes = {
  WorldClockChoose: undefined;
};

export type AlarmNavigatorRoutes = {
  Alarm: undefined;
  AlarmDefinitionModal: {
    selectedAlarm?: Alarm;
  };
};

export type AlarmDefinitionRoutes = {
  AlarmDefinition: undefined;
  AlarmRepeatSelection: undefined;
  AlarmRingtonesSelection: undefined;
};

export type StopwatchNavigatorRoutes = {
  Stopwatch: undefined;
};

export type TimerNavigatorRoutes = {
  Timer: undefined;
};
