import { WeekDay } from '../consts';

export type AlarmSound = {
  name: string;
  file: string;
};

export type AlarmNotification = {
  id: string;
  position: number;
  triggerDate: number;
};

export type Alarm = {
  id: string;
  name: string;
  hour: number;
  minute: number;
  repeat: WeekDay[];
  sound: AlarmSound;
  snooze: boolean;
  active: boolean;
  notifications: AlarmNotification[];
};
