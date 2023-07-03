import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigatorUtils } from '../../hooks';

// Interfaces
import { StopwatchNavigatorRoutes } from '../../../routes';

// Screens
import StopwatchScreen from '../../screens/stopwatchTab/Stopwatch';

const Stack = createNativeStackNavigator<StopwatchNavigatorRoutes>();

const StopwatchNavigator: React.FC = () => {
  const { screenOptions } = useNavigatorUtils();

  return (
    <Stack.Navigator initialRouteName="Stopwatch" screenOptions={screenOptions}>
      <Stack.Screen name="Stopwatch" component={StopwatchScreen} />
    </Stack.Navigator>
  );
};

export default StopwatchNavigator;
