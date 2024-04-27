import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  CommonActions,
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
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    registerIosAction();
  }, []);

  const RenderContent: React.FC<{
    type: OnboardingSections;
    active?: boolean;
    last?: boolean;
    onActionPress: () => void;
  }> = useCallback(({ type, active, last, onActionPress }) => {
    switch (type) {
      case OnboardingSections.INTRO:
        return <Intro actionText="Próximo" onActionPress={onActionPress} />;
      case OnboardingSections.ALLOW_NOTIFICATIONS:
        return <AllowNotifications active={active} onAllowed={onActionPress} />;
      case OnboardingSections.ALLOW_ALARM_ANDROID:
        return <AndroidAllowAlarm active={active} onAllowed={onActionPress} />;
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
    setCarouselIndex(value => value + 1);
    if (last) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'BottomNaviagtor',
              params: {},
            },
          ],
        }),
      );
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
        enabled={false}
        autoFillData={false}
        renderItem={({ item, index }) => (
          <RenderContent
            type={item}
            last={index === flow.length - 1}
            active={carouselIndex === index}
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
