import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { InfoContent } from '../.././../../components';
import { useTheme } from 'styled-components';
import {
  isAndroidAlarmPermissionAllowed,
  openAlarmPermissionSettings,
} from '../../../../utils/notification';

export type AndroidAllowAlarm = {
  onAllowed: () => void;
};

const AndroidAllowAlarm: React.FC<AndroidAllowAlarm> = ({ onAllowed }) => {
  const theme = useTheme();
  const [checkFaills, setCheckFaills] = useState(false);

  const handleRequestPermission = async () => {
    if (await isAndroidAlarmPermissionAllowed()) {
      onAllowed();
    } else {
      setCheckFaills(true);
    }
  };

  const openSettings = () => {
    openAlarmPermissionSettings();
  };

  return (
    <InfoContent
      title="Notificações de alarme"
      description="Acesse as configurações para permitir notifiçaões de alarme agendadas"
      banner={
        <View
          style={{
            ...styles.iconContainer,
            backgroundColor: theme.primaryLight,
          }}>
          <Icon name="clock-alert" size={120} color={theme.lighthen} />
        </View>
      }
      descriptionButtonText="Ir as configurações"
      hint={
        checkFaills ? 'Você ainda não autorizou! Tente novamente.' : undefined
      }
      hintColor={theme.danger}
      actionText="Verificar"
      onActionPress={handleRequestPermission}
      onDescriptionButtonPress={openSettings}
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
