import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

// Interfaces
import { StopwatchNavigatorRoutes } from '../../../routes';

// Screens
import StopwatchScreen from '../../screens/stopwatchTab/Stopwatch';

// Utils
import { stackScreenOptions } from '../../utils/navigator/stackScreen';

const Stack = createStackNavigator<StopwatchNavigatorRoutes>();

const StopwatchNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="Stopwatch">
      <Stack.Screen
        name="Stopwatch"
        component={StopwatchScreen}
        options={stackScreenOptions(theme)}
      />
    </Stack.Navigator>
  );
};

export default StopwatchNavigator;
