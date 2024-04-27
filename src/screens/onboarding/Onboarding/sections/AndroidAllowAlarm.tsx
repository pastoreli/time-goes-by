import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { InfoContent } from '../.././../../components';
import { useTheme } from 'styled-components';
import {
  isAndroidAlarmPermissionAllowed,
  openAlarmPermissionSettings,
} from '../../../../utils/notification';
import { useAppState } from '@react-native-community/hooks';

export type AndroidAllowAlarm = {
  active?: boolean;
  onAllowed: () => void;
};

const AndroidAllowAlarm: React.FC<AndroidAllowAlarm> = ({
  active,
  onAllowed,
}) => {
  const theme = useTheme();
  const appState = useAppState();

  const handleAlarmNotificationStatus = async () => {
    if (await isAndroidAlarmPermissionAllowed()) {
      onAllowed();
    }
  };

  const openSettings = () => {
    openAlarmPermissionSettings();
  };

  useEffect(() => {
    if (appState === 'active' && active) {
      handleAlarmNotificationStatus();
    }
  }, [appState, active]);

  return (
    <InfoContent
      title="Notificações de alarme"
      description="Acesse as configurações para permitir notificações de alarme agendadas."
      banner={
        <View
          style={{
            ...styles.iconContainer,
            backgroundColor: theme.primaryLight,
          }}>
          <Icon name="clock-alert" size={120} color={theme.lighthen} />
        </View>
      }
      actionText="Ir às configurações"
      sencondaryActionText="Agora não"
      onActionPress={openSettings}
      onSecondaryActionPress={onAllowed}
    />
  );
};

export default AndroidAllowAlarm;

const styles = StyleSheet.create({
  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notAllowedContainer: {
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: 'solid',
    overflow: 'hidden',
    padding: 5,
  },
});
