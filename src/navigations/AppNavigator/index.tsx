import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { useNavigatorUtils } from '../../hooks';

// Interfaces
import { RootStack } from '../../../routes';

// Screens
import BottomNavigator from '../BottomNavigator';
import Onboarding from '../../screens/onboarding/Onboarding';
import LoadingApp from '../../screens/loadingApp/Loading';

const Stack = createNativeStackNavigator<RootStack>();

const AppNavigator = () => {
  const theme = useTheme();
  const { screenOptions } = useNavigatorUtils();

  return (
    <Stack.Navigator initialRouteName="LoadingApp">
      <Stack.Screen
        name="LoadingApp"
        component={LoadingApp}
        options={{
          ...screenOptions,
          headerShown: false,
          navigationBarColor: theme.containerBg,
        }}
      />
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          ...screenOptions,
          headerShown: false,
          navigationBarColor: theme.containerBg,
        }}
      />
      <Stack.Screen
        name="BottomNaviagtor"
        component={BottomNavigator}
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.containerBg,
          },
          navigationBarColor: theme.bottomNavigation,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
