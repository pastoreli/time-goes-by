import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigatorUtils } from '../../hooks';

// Interfaces
import { AlarmNavigatorRoutes } from '../../../routes';

// Screens
import AlarmScreen from '../../screens/alarmTab/Alarm';

const Stack = createNativeStackNavigator<AlarmNavigatorRoutes>();

const AlarmNavigator: React.FC = () => {
  const { screenOptions } = useNavigatorUtils();

  return (
    <Stack.Navigator initialRouteName="Alarm" screenOptions={screenOptions}>
      <Stack.Screen name="Alarm" component={AlarmScreen} />
    </Stack.Navigator>
  );
};

export default AlarmNavigator;
