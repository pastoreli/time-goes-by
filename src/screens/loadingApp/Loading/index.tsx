import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, View, StyleSheet, Platform } from 'react-native';
import notifee from '@notifee/react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTheme } from 'styled-components/native';
import AppLogo from '../../../assets/images/app-logo.svg';
import { BottomNavigatorRoutes, RootStack } from '../../../../routes';
import { OnboardingSections } from '../../../consts';
import { useSettings } from '../../../hooks';
import { handleNotificationInteraction } from '../../../utils/notification';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

type ScreenNavigationProp = NavigationProp<RootStack, 'LoadingApp'>;

const Loading = () => {
  const theme = useTheme();
  const { getOnboardingFlow } = useSettings();
  const navigation = useNavigation<ScreenNavigationProp>();
  const screenWidth = Dimensions.get('screen').width;

  const refLoadInterval = useRef<NodeJS.Timeout>();

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState({
    notification: true,
    onboarding: true,
    interval: true,
  });
  const [initialScreen, setInialScreen] =
    useState<keyof BottomNavigatorRoutes>();
  const [onboardingFlow, setOnboardingFlow] = useState<OnboardingSections[]>(
    [],
  );

  const startLoading = useCallback(() => {
    refLoadInterval.current = setInterval(
      () => setLoadingProgress(value => (value >= 100 ? 0 : value + 2)),
      200,
    );
  }, []);

  const handleNotificationOpenApp = async () => {
    if (Platform.OS === 'android') {
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification) {
        const { pressAction, notification } = initialNotification;
        const initalScreen = notification.data
          ?.screen as keyof BottomNavigatorRoutes;
        setInialScreen(initalScreen);
        if (pressAction.id === 'default') {
          await handleNotificationInteraction(initialNotification);
        }
      }
    }
    setIsLoading(value => ({ ...value, notification: false }));
  };

  const handleOnboardingFlow = async () => {
    const result = await getOnboardingFlow();
    setOnboardingFlow(result);
    setIsLoading(value => ({ ...value, onboarding: false }));
  };

  const loadResolution = useCallback(() => {
    if (
      !isLoading.notification &&
      !isLoading.onboarding &&
      !isLoading.interval
    ) {
      if (onboardingFlow.length > 0) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Onboarding',
                params: {
                  flow: onboardingFlow,
                },
              },
            ],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'BottomNaviagtor',
                params: {
                  initialScreen: initialScreen || 'WorldClockTab',
                },
              },
            ],
          }),
        );
      }
    }
  }, [isLoading]);

  useEffect(() => {
    handleOnboardingFlow();
    handleNotificationOpenApp();
  }, []);

  useEffect(() => {
    startLoading();

    return () => {
      clearInterval(refLoadInterval.current);
    };
  }, [startLoading]);

  useEffect(() => {
    loadResolution();
  }, [loadResolution]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(value => ({ ...value, interval: false }));
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={screenWidth - 100}
        width={15}
        fill={loadingProgress}
        backgroundColor={theme.lighthen2}
        tintColor={theme.primary}>
        {() => (
          <View style={styles.logo}>
            <AppLogo width={200} />
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
