import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigatorUtils } from '../../hooks';

// Interfaces
import { WorldClockNavigatorRoutes } from '../../../routes';

// Screens
import WorldClockScreen from '../../screens/worldClockTab/WorldClock';
import WorldClockChooseNavigator from '../WorldClockChooseNavigator';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator<WorldClockNavigatorRoutes>();

const WorldClockNavigator: React.FC = () => {
  const { screenOptions } = useNavigatorUtils();

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
          presentation: Platform.OS === 'ios' ? 'modal' : 'card',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default WorldClockNavigator;
