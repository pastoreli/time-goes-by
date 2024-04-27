import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Linking, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { InfoContent } from '../.././../../components';
import { useTheme } from 'styled-components';
import {
  requestForNotificationAuthorization,
  isNotificationAllowed,
} from '../../../../utils/notification';
import { IosNativeScreens } from '../../../../consts';
import { useAppState } from '@react-native-community/hooks';
import { useSettings } from '../../../../hooks';

export type AllowNotificationsProps = {
  active?: boolean;
  onAllowed: () => void;
};

const AllowNotifications: React.FC<AllowNotificationsProps> = ({
  active,
  onAllowed,
}) => {
  const theme = useTheme();
  const { handleOnboardingView, getOnboardingSettings } = useSettings();
  const appState = useAppState();

  const [nowAllowed, setNotAllowed] = useState(false);

  const handleNotificationStatus = async () => {
    const allowed = await isNotificationAllowed();
    if (allowed) {
      onAllowed();
    }
  };

  const handleRequestPermission = async () => {
    const allowed = await requestForNotificationAuthorization();
    handleOnboardingView('haveTriedAllowNotifications');
    if (allowed) {
      onAllowed();
    } else {
      setNotAllowed(true);
    }
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(IosNativeScreens.TIME_GOES_BY_NOTIFICATION_SETTINGS);
    } else {
      Linking.openSettings();
    }
  };

  const handleShowSection = async () => {
    const data = await getOnboardingSettings();
    setNotAllowed(Boolean(data.haveTriedAllowNotifications));
  };

  useEffect(() => {
    handleShowSection();
  }, []);

  useEffect(() => {
    if (appState === 'active' && active) {
      handleNotificationStatus();
    }
  }, [appState, active]);

  if (nowAllowed) {
    return (
      <InfoContent
        title="Sem permissão para notificações"
        description="Acesse as configurações de notificações no seu aparelho e permita que o Time Goes By use o recurso."
        banner={
          <View
            style={{
              ...styles.iconContainer,
              backgroundColor: theme.primaryLight,
            }}>
            <Icon name="bell-off" size={120} color={theme.lighthen} />
          </View>
        }
        hint="O alarme não irá tocar enquanto as notificações estiverem desativadas."
        actionText="Ir as configurações"
        sencondaryActionText="Agora não"
        onActionPress={openSettings}
        onSecondaryActionPress={onAllowed}
      />
    );
  }

  return (
    <InfoContent
      title="Notificações"
      description="Permita as notificações para que o Time Goes By possa lhe avisar."
      banner={
        <View
          style={{
            ...styles.iconContainer,
            backgroundColor: theme.primaryLight,
          }}>
          <Icon name="bell-badge" size={120} color={theme.lighthen} />
        </View>
      }
      actionText="Permitir"
      onActionPress={handleRequestPermission}
    />
  );
};

export default AllowNotifications;

const styles = StyleSheet.create({
  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
