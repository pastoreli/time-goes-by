import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigatorUtils } from '../../hooks';

// Interfaces
import { AlarmNavigatorRoutes, BottomNavigatorRoutes } from '../../../routes';

// Screens
import AlarmScreen from '../../screens/alarmTab/Alarm';
import AlarmDefinitionNavigator from '../AlarmDefinitionNavigator';
import { useTheme } from 'styled-components/native';
import { Platform } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator<AlarmNavigatorRoutes>();
type ScreenRouteProp = RouteProp<BottomNavigatorRoutes, 'AlarmTab'>;

const AlarmNavigator: React.FC = () => {
  const { screenOptions } = useNavigatorUtils();
  const theme = useTheme();
  const route = useRoute<ScreenRouteProp>();

  const { openDefinitions } = route.params || {};

  return (
    <Stack.Navigator initialRouteName="Alarm" screenOptions={screenOptions}>
      <Stack.Screen
        name="Alarm"
        component={AlarmScreen}
        options={{
          title: 'Alarmes',
        }}
        initialParams={{
          openDefinitions,
        }}
      />
      <Stack.Screen
        name="AlarmDefinitionModal"
        component={AlarmDefinitionNavigator}
        options={{
          presentation: 'modal',
          headerShown: false,
          navigationBarColor: theme.containerSecondaryBg,
          animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
        }}
      />
    </Stack.Navigator>
  );
};

export default AlarmNavigator;
