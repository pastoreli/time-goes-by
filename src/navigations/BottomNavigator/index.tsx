import React, { useCallback, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Interfaces
import { BottomNavigatorRoutes, RootStack } from '../../../routes';

// Components
import { TabBar } from '../../components';

// Screens
import WorldClockNavigator from '../WorldClockNavigator';
import AlarmNavigator from '../AlarmNavigator';
import StopwatchNavigator from '../StopwatchNavigator';
import TimerNavigator from '../TimerNavigator';
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useShortCuts } from '../../hooks';
import { ShortCuts } from '../../consts';
import { ShortcutItem } from 'react-native-actions-shortcuts';
import { Platform } from 'react-native';

type ScreenRouteProp = RouteProp<RootStack, 'BottomNaviagtor'>;

const Tab = createBottomTabNavigator<BottomNavigatorRoutes>();

const BottomNavigator: React.FC = () => {
  const route = useRoute<ScreenRouteProp>();
  const { tabBarVisible } = useSelector((state: RootState) => state.layout);
  const { ShortcutsEmitter, setShortcuts, getShortcuts } = useShortCuts();
  const navigation = useNavigation();

  const { initialScreen } = route.params || {};

  const registerShortCuts = useCallback(async () => {
    const result = await getShortcuts();
    if (result.length === 0) {
      setShortcuts([
        ShortCuts.SET_ALARM,
        ShortCuts.START_STOPWATCH,
        ShortCuts.SET_TIMER,
      ]);
    }
  }, []);

  const handleSortCuts = useCallback((item: ShortcutItem) => {
    if (item.data.screen) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [item.data.screen],
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      ShortcutsEmitter.addListener('onShortcutItemPressed', handleSortCuts);
    }

    return () => {
      if (Platform.OS === 'ios') {
        ShortcutsEmitter.removeAllListeners('onShortcutItemPressed');
      }
    };
  }, [handleSortCuts]);

  useEffect(() => {
    registerShortCuts();
  }, [registerShortCuts]);

  return (
    <Tab.Navigator
      initialRouteName={initialScreen ? initialScreen : 'WorldClockTab'}
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} show={tabBarVisible} />}>
      <Tab.Screen name="WorldClockTab" component={WorldClockNavigator} />
      <Tab.Screen name="AlarmTab" component={AlarmNavigator} />
      <Tab.Screen name="StopwatchTab" component={StopwatchNavigator} />
      <Tab.Screen name="TimerTab" component={TimerNavigator} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
