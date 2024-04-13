import React from 'react';
import { View, StyleSheet, Image, Linking, Platform } from 'react-native';
import { InfoContent } from '../.././../../components';
import { useTheme } from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AndroidNativeScreens, IosNativeScreens } from '../../../../consts';
import { useSettings } from '../../../../hooks';

export type DoNotDisturbProps = {
  actionText: string;
  onActionPress: () => void;
};

const DoNotDisturb: React.FC<DoNotDisturbProps> = ({
  actionText,
  onActionPress,
}) => {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { handleOnboardingView } = useSettings();

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(IosNativeScreens.DO_NOT_DISTURB);
    } else {
      Linking.sendIntent(AndroidNativeScreens.SETTINGS);
    }
  };

  const handlePress = async () => {
    await handleOnboardingView('doNotDisturb');
    onActionPress();
  };

  return (
    <View style={{ ...styles.container, paddingTop: safeAreaInsets.top }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <InfoContent
          title="Modo não perturbe"
          description={
            'Para que o Time Goes By funcione no modo "Não perturbe" acesse as configurações do modo e inclua o App.'
          }
          banner={
            Platform.OS === 'ios' ? (
              <View
                style={{
                  ...styles.banner,
                  borderColor: theme.darken1,
                }}>
                <Image
                  source={require('../../../../assets/images/ios-do-not-disturb.gif')}
                  borderRadius={10}
                />
              </View>
            ) : (
              <View
                style={{
                  ...styles.iconContainer,
                  backgroundColor: theme.primaryLight,
                }}>
                <Icon
                  name="moon-waning-crescent"
                  size={120}
                  color={theme.lighthen}
                  style={styles.icon}
                />
              </View>
            )
          }
          hint="Não se esqueça de adicionar a outros modos caso você tenha!"
          descriptionButtonText="Ir às configurações"
          actionText={actionText}
          onActionPress={handlePress}
          onDescriptionButtonPress={openSettings}
        />
      </ScrollView>
    </View>
  );
};

export default DoNotDisturb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingTop: 20,
  },
  banner: {
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: 'solid',
    overflow: 'hidden',
    padding: 5,
  },
  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotate(-40deg)',
  },
  icon: {
    marginLeft: 20,
  },
});
