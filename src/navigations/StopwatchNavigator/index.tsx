import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigatorUtils } from '../../hooks';

// Interfaces
import {
  BottomNavigatorRoutes,
  StopwatchNavigatorRoutes,
} from '../../../routes';

// Screens
import StopwatchScreen from '../../screens/stopwatchTab/Stopwatch';
import { RouteProp, useRoute } from '@react-navigation/native';

type ScreenRouteProp = RouteProp<BottomNavigatorRoutes, 'StopwatchTab'>;

const Stack = createNativeStackNavigator<StopwatchNavigatorRoutes>();

const StopwatchNavigator: React.FC = () => {
  const { screenOptions } = useNavigatorUtils();
  const route = useRoute<ScreenRouteProp>();

  return (
    <Stack.Navigator initialRouteName="Stopwatch" screenOptions={screenOptions}>
      <Stack.Screen
        name="Stopwatch"
        component={StopwatchScreen}
        options={{ title: 'Cronômetro' }}
        initialParams={route.params || {}}
      />
    </Stack.Navigator>
  );
};

export default StopwatchNavigator;
