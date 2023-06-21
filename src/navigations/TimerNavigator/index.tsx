import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

// Interfaces
import { TimerNavigatorRoutes } from '../../../routes';

// Screens
import HomeScreen from '../../screens/alarmTab/Alarm';

// Utils
import { stackScreenOptions } from '../../utils/navigator/stackScreen';

const Stack = createStackNavigator<TimerNavigatorRoutes>();

const TimerNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="Timer">
      <Stack.Screen
        name="Timer"
        component={HomeScreen}
        options={stackScreenOptions(theme)}
      />
    </Stack.Navigator>
  );
};

export default TimerNavigator;
