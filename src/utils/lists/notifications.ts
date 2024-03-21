import { AndroidAction } from '@notifee/react-native';
import { NotificationActions } from '../../consts';

export const androidSimpleStopActions: AndroidAction[] = [
  {
    title: 'Parar',
    pressAction: {
      id: NotificationActions.STOP,
    },
  },
];

export const androidAlarmActions: AndroidAction[] = [
  {
    title: 'Parar',
    pressAction: {
      id: NotificationActions.STOP,
    },
  },
  {
    title: 'Adiar',
    pressAction: {
      id: NotificationActions.SNOOZE,
    },
  },
];
