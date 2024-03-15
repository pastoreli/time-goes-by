import { registerRootComponent } from 'expo';
import notifee, { EventType } from '@notifee/react-native';
import { handleNotificationInteraction } from './src/utils/notification';
import App from './App';
import { NotificationActions } from './src/consts';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.ACTION_PRESS) {
    if (
      detail.pressAction?.id === NotificationActions.STOP ||
      detail.pressAction?.id === NotificationActions.SNOOZE
    ) {
      await handleNotificationInteraction(detail);
    }
  }
});

registerRootComponent(App);
