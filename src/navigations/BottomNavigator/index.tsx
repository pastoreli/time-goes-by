import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Interfaces
import { BottomNavigatorRoutes } from '../../../routes';

// Components
import { TabBar } from '../../components';

// Screens
import WorldClockNavigator from '../WorldClockNavigator';
import AlarmNavigator from '../AlarmNavigator';
import StopwatchNavigator from '../StopwatchNavigator';
import TimerNavigator from '../TimerNavigator';

const Tab = createBottomTabNavigator<BottomNavigatorRoutes>();

const BottomNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="WorldClockTab"
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
