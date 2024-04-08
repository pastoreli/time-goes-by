import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigatorUtils } from '../../hooks';

// Interfaces
import { WorldClockNavigatorRoutes } from '../../../routes';

// Screens
import WorldClockScreen from '../../screens/worldClockTab/WorldClock';
import WorldClockChooseNavigator from '../WorldClockChooseNavigator';
import { useTheme } from 'styled-components/native';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator<WorldClockNavigatorRoutes>();

const WorldClockNavigator: React.FC = () => {
  const { screenOptions } = useNavigatorUtils();
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="WorldClock"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="WorldClock"
        component={WorldClockScreen}
        options={{
          title: 'Relógio',
        }}
      />
      <Stack.Screen
        name="WorldClockChooseModal"
        component={WorldClockChooseNavigator}
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

export default WorldClockNavigator;
