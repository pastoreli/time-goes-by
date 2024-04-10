import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { useNavigatorUtils } from '../../hooks';

// Interfaces
import { BottomNavigatorRoutes, RootStack } from '../../../routes';

// Screens
import BottomNavigator from '../BottomNavigator';
import Onboarding from '../../screens/onboarding/Onboarding';

export type AppNavigatorProps = {
  initialScreen?: keyof BottomNavigatorRoutes;
};

const Stack = createNativeStackNavigator<RootStack>();

const AppNavigator: React.FC<AppNavigatorProps> = ({ initialScreen }) => {
  const theme = useTheme();
  const { screenOptions } = useNavigatorUtils();

  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          ...screenOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BottomNaviagtor"
        component={BottomNavigator}
        initialParams={{
          initialScreen,
        }}
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
