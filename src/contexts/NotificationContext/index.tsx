import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import notifee, {
  AuthorizationStatus,
  EventType,
  Event,
  AndroidNotificationSetting,
} from '@notifee/react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import {
  NotificationActions,
  NotificationActionsGroup,
  NotificationId,
} from '../../consts';
import { handleNotificationInteraction } from '../../utils/notification';

export type NotificationContextType = {
  alarmNotificationAction?: (action: () => void) => void;
};

export const NotificationContext = createContext<NotificationContextType>({});

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const navigation = useNavigation();

  const [alarmNotificationActionState, setAlarmNotificationActionState] =
    useState<() => void>();

  const alarmNotificationAction = useCallback((action: () => void) => {
    setAlarmNotificationActionState(() => action);
  }, []);

  const registerAction = async () => {
    await notifee.setNotificationCategories([
      {
        id: NotificationActionsGroup.SIMPLE_STOP,
        actions: [
          {
            id: NotificationActions.STOP,
            title: 'Parar',
          },
        ],
      },
      {
        id: NotificationActionsGroup.ALARM,
        actions: [
          {
            id: NotificationActions.STOP,
            title: 'Parar',
          },
          {
            id: NotificationActions.SNOOZE,
            title: 'Adiar',
          },
        ],
      },
    ]);
  };

  const registerForPushNotifications = async () => {
    const finalStatus = await notifee.requestPermission({
      sound: true,
      alert: true,
      announcement: true,
      criticalAlert: true,
    });
    const settings = notifee.getNotificationSettings();
    if ((await settings).android.alarm !== AndroidNotificationSetting.ENABLED) {
      await notifee.openAlarmPermissionSettings();
    }
    if (finalStatus.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
      console.warn('User declined permissions');
    }

    await registerAction();
  };

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const handleNofications = useCallback(
    async ({ type, detail }: Event) => {
      if (
        [EventType.DISMISSED, EventType.PRESS, EventType.ACTION_PRESS].includes(
          type,
        )
      ) {
        await handleNotificationInteraction(detail);
        const data = detail.notification?.data;
        if (data?.catergoryId === NotificationId.ALARM) {
          alarmNotificationActionState?.();
        }
        if (data?.screen) {
          navigation.dispatch(
            CommonActions.navigate({
              name: data.screen as string,
            }),
          );
        }
      }
    },
    [alarmNotificationActionState],
  );

  useEffect(() => {
    // notifee.cancelAllNotifications();
    return notifee.onForegroundEvent(event => {
      handleNofications(event);
    });
  }, [notifee, handleNofications]);

  return (
    <NotificationContext.Provider
      value={{
        alarmNotificationAction,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  return context;
};
