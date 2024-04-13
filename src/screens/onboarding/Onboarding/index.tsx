import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Intro,
  AllowNotifications,
  DoNotDisturb,
  AndroidAllowAlarm,
} from './sections';
import { RootStack } from '../../../../routes';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { OnboardingSections } from '../../../consts';
import { registerIosAction } from '../../../utils/notification';

type ScreenNavigationProp = NavigationProp<RootStack, 'Onboarding'>;
type ScreenRouteProp = RouteProp<RootStack, 'Onboarding'>;

export const Onboarding = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height - safeAreaInsets.bottom;

  const refCarousel = useRef<any>();

  const { flow } = route.params;

  useEffect(() => {
    registerIosAction();
  }, []);

  const RenderContent: React.FC<{
    type: OnboardingSections;
    last?: boolean;
    onActionPress: () => void;
  }> = useCallback(({ type, last, onActionPress }) => {
    switch (type) {
      case OnboardingSections.INTRO:
        return <Intro actionText="Próximo" onActionPress={onActionPress} />;
      case OnboardingSections.ALLOW_NOTIFICATIONS:
        return <AllowNotifications onAllowed={onActionPress} />;
      case OnboardingSections.ALLOW_ALARM_ANDROID:
        return <AndroidAllowAlarm onAllowed={onActionPress} />;
      case OnboardingSections.DO_NOT_DISTURB:
        return (
          <DoNotDisturb
            actionText={last ? 'Concluir' : 'Próximo'}
            onActionPress={onActionPress}
          />
        );
    }
  }, []);

  const handleNext = (last: boolean) => {
    if (last) {
      navigation.navigate('BottomNaviagtor', {});
    } else {
      refCarousel.current.next();
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={refCarousel}
        width={width}
        height={height}
        data={flow}
        scrollAnimationDuration={1000}
        enabled={false}
        renderItem={({ item, index }) => (
          <RenderContent
            type={item}
            last={index === flow.length - 1}
            onActionPress={() => handleNext(index === flow.length - 1)}
          />
        )}
      />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
