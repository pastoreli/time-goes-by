import { WeekDay } from '../consts';
import { Sound } from './sound';

export type AlarmNotification = {
  id: string;
  position: number;
  triggerDate: number;
};

export interface Alarm {
  id: string;
  name: string;
  hour: number;
  minute: number;
  repeat: WeekDay[];
  sound: Sound;
  snooze: boolean;
  active: boolean;
  notifications: AlarmNotification[];
}
