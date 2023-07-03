import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigatorUtils } from '../../hooks';

// Interfaces
import { WorldClockNavigatorRoutes } from '../../../routes';

// Screens
import WorldClockScreen from '../../screens/worldClockTab/WorldClock';

const Stack = createNativeStackNavigator<WorldClockNavigatorRoutes>();

const WorldClockNavigator: React.FC = () => {
  const { screenOptions } = useNavigatorUtils();

  return (
    <Stack.Navigator
      initialRouteName="WorldClock"
      screenOptions={screenOptions}>
      <Stack.Screen name="WorldClock" component={WorldClockScreen} />
    </Stack.Navigator>
  );
};

export default WorldClockNavigator;
