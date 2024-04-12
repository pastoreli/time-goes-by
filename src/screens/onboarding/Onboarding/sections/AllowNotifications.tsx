import React, { useState } from 'react';
import { View, StyleSheet, Linking, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { InfoContent } from '../.././../../components';
import { useTheme } from 'styled-components';
import { requestForNotificationAuthorization } from '../../../../utils/notification';
import { IosNativeScreens } from '../../../../consts';

export type AllowNotificationsProps = {
  onAllowed: () => void;
};

const AllowNotifications: React.FC<AllowNotificationsProps> = ({
  onAllowed,
}) => {
  const theme = useTheme();
  const [nowAllowed, setNotAllowed] = useState(false);
  const [checkFaills, setCheckFaills] = useState(false);

  const handleRequestPermission = async () => {
    const allowed = await requestForNotificationAuthorization();
    if (allowed) {
      onAllowed();
    } else {
      setCheckFaills(nowAllowed);
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

  if (nowAllowed) {
    return (
      <InfoContent
        title="Sem permição para notificações"
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
  notAllowedContainer: {
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: 'solid',
    overflow: 'hidden',
    padding: 5,
  },
});
