import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

// Interfaces
import { RootStack } from '../../../routes';

// Screens
import BottomNavigator from '../BottomNavigator';

const Stack = createStackNavigator<RootStack>();

const HomeNavigator: React.FC = () => {
  const theme = useTheme();

  const stackOptions: StackNavigationOptions = {
    headerTintColor: theme.textColor.darken,
    headerStyle: {
      backgroundColor: theme.containerBg,
    },
    cardStyle: {
      backgroundColor: theme.containerBg,
    },
  };

  return (
    <Stack.Navigator initialRouteName="BottomNaviagtor">
      <Stack.Screen
        name="BottomNaviagtor"
        component={BottomNavigator}
        options={{
          headerShown: false,
          ...stackOptions,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
