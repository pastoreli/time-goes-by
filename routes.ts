import { OnboardingSections } from './src/consts';
import { Alarm } from './src/interfaces/alarm';

export type RootStack = {
  LoadingApp: undefined;
  Onboarding: {
    flow: OnboardingSections[];
  };
  BottomNaviagtor: {
    initialScreen?: keyof BottomNavigatorRoutes;
  };
};

export type BottomNavigatorRoutes = {
  WorldClockTab: undefined;
  AlarmTab: {
    openDefinitions?: boolean;
  };
  StopwatchTab: {
    start?: boolean;
    stop?: boolean;
  };
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
  Alarm: {
    openDefinitions?: boolean;
  };
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
  Stopwatch: {
    start?: boolean;
    stop?: boolean;
  };
};

export type TimerNavigatorRoutes = {
  Timer: undefined;
};
