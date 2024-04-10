import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppLogo from '../../../../assets/images/app-logo.svg';
import { InfoContent } from '../.././../../components';

export type IntroProps = {
  actionText: string;
  onActionPress: () => void;
};

const Intro: React.FC<IntroProps> = ({ actionText, onActionPress }) => (
  <InfoContent
    title="Time Goes By"
    description="Um relógio que deixa sua vida mais fácil."
    banner={
      <View style={styles.logo}>
        <AppLogo width={200} />
      </View>
    }
    actionText={actionText}
    onActionPress={onActionPress}
  />
);

export default Intro;

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
