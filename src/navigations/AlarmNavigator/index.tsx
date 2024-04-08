import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigatorUtils } from '../../hooks';

// Interfaces
import { AlarmNavigatorRoutes } from '../../../routes';

// Screens
import AlarmScreen from '../../screens/alarmTab/Alarm';
import AlarmDefinitionNavigator from '../AlarmDefinitionNavigator';
import { useTheme } from 'styled-components/native';

const Stack = createNativeStackNavigator<AlarmNavigatorRoutes>();

const AlarmNavigator: React.FC = () => {
  const { screenOptions } = useNavigatorUtils();
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="Alarm" screenOptions={screenOptions}>
      <Stack.Screen
        name="Alarm"
        component={AlarmScreen}
        options={{
          title: 'Alarmes',
        }}
      />
      <Stack.Screen
        name="AlarmDefinitionModal"
        component={AlarmDefinitionNavigator}
        options={{
          presentation: 'modal',
          headerShown: false,
          navigationBarColor: theme.containerSecondaryBg,
        }}
      />
    </Stack.Navigator>
  );
};

export default AlarmNavigator;
