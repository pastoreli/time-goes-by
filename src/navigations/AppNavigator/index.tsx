import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

// Interfaces
import { BottomNavigatorRoutes, RootStack } from '../../../routes';

// Screens
import BottomNavigator from '../BottomNavigator';

export type AppNavigatorProps = {
  initialScreen?: keyof BottomNavigatorRoutes;
};

const Stack = createNativeStackNavigator<RootStack>();

const AppNavigator: React.FC<AppNavigatorProps> = ({ initialScreen }) => {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="BottomNaviagtor">
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
