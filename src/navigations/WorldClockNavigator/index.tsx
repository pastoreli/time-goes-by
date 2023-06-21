import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

// Interfaces
import { WorldClockNavigatorRoutes } from '../../../routes';

// Screens
import WorldClockScreen from '../../screens/worldClockTab/WorldClock';

// Utils
import { stackScreenOptions } from '../../utils/navigator/stackScreen';

const Stack = createStackNavigator<WorldClockNavigatorRoutes>();

const WorldClockNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="WorldClock">
      <Stack.Screen
        name="WorldClock"
        component={WorldClockScreen}
        options={stackScreenOptions(theme)}
      />
    </Stack.Navigator>
  );
};

export default WorldClockNavigator;
