import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppLogo from '../../../../assets/images/app-logo.svg';
import { InfoContent } from '../.././../../components';
import { useSettings } from '../../../../hooks';

export type IntroProps = {
  actionText: string;
  onActionPress: () => void;
};

const Intro: React.FC<IntroProps> = ({ actionText, onActionPress }) => {
  const { handleOnboardingView } = useSettings();

  const handlePress = async () => {
    await handleOnboardingView('intro');
    onActionPress();
  };

  return (
    <InfoContent
      title="Time Goes By"
      description="Um relógio que deixa sua vida mais fácil."
      banner={
        <View style={styles.logo}>
          <AppLogo width={200} />
        </View>
      }
      actionText={actionText}
      onActionPress={handlePress}
    />
  );
};

export default Intro;

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
