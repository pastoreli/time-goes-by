import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigatorUtils } from '../../hooks';

// Interfaces
import { TimerNavigatorRoutes } from '../../../routes';

// Screens
import HomeScreen from '../../screens/timerTab/Timer';

const Stack = createNativeStackNavigator<TimerNavigatorRoutes>();

const TimerNavigator: React.FC = () => {
  const { screenOptions } = useNavigatorUtils();

  return (
    <Stack.Navigator initialRouteName="Timer" screenOptions={screenOptions}>
      <Stack.Screen
        name="Timer"
        component={HomeScreen}
        options={{ title: 'Temporizador' }}
      />
    </Stack.Navigator>
  );
};

export default TimerNavigator;
