import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Intro, AllowNotifications, DoNotDisturb } from './sections';

enum ComponentType {
  INTRO = 0,
  ALLOW_NOTIFICATIONS = 1,
  DO_NOT_DISTURB = 2,
}

const onboardComponent = [
  ComponentType.INTRO,
  ComponentType.ALLOW_NOTIFICATIONS,
  ComponentType.DO_NOT_DISTURB,
];

export const Onboarding = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height - safeAreaInsets.bottom;

  const refCarousel = useRef<any>();

  const RenderContent: React.FC<{
    type: ComponentType;
    onActionPress: () => void;
  }> = useCallback(({ type, onActionPress }) => {
    switch (type) {
      case ComponentType.INTRO:
        return <Intro actionText="Próximo" onActionPress={onActionPress} />;
      case ComponentType.ALLOW_NOTIFICATIONS:
        return <AllowNotifications onAllowed={onActionPress} />;
      case ComponentType.DO_NOT_DISTURB:
        return (
          <DoNotDisturb actionText="Próximo" onActionPress={onActionPress} />
        );
    }
  }, []);

  const handleNext = () => {
    refCarousel.current.next();
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={refCarousel}
        width={width}
        height={height}
        data={onboardComponent}
        scrollAnimationDuration={1000}
        enabled={false}
        renderItem={({ item }) => (
          <RenderContent type={item} onActionPress={handleNext} />
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
