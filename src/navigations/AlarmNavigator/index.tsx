import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

// Interfaces
import { AlarmNavigatorRoutes } from '../../../routes';

// Screens
import AlarmScreen from '../../screens/alarmTab/Alarm';

// Utils
import { stackScreenOptions } from '../../utils/navigator/stackScreen';

const Stack = createStackNavigator<AlarmNavigatorRoutes>();

const AlarmNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="Alarm">
      <Stack.Screen
        name="Alarm"
        component={AlarmScreen}
        options={stackScreenOptions(theme)}
      />
    </Stack.Navigator>
  );
};

export default AlarmNavigator;
