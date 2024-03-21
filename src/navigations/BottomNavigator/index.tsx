import React from 'react';
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
import { RouteProp, useRoute } from '@react-navigation/native';

type ScreenRouteProp = RouteProp<RootStack, 'BottomNaviagtor'>;

const Tab = createBottomTabNavigator<BottomNavigatorRoutes>();

const BottomNavigator: React.FC = () => {
  const route = useRoute<ScreenRouteProp>();

  const { initialScreen } = route.params;

  return (
    <Tab.Navigator
      initialRouteName={initialScreen ? initialScreen : 'WorldClockTab'}
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="WorldClockTab" component={WorldClockNavigator} />
      <Tab.Screen name="AlarmTab" component={AlarmNavigator} />
      <Tab.Screen name="StopwatchTab" component={StopwatchNavigator} />
      <Tab.Screen name="TimerTab" component={TimerNavigator} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
