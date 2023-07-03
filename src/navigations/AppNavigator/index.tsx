import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

// Interfaces
import { RootStack } from '../../../routes';

// Screens
import BottomNavigator from '../BottomNavigator';

const Stack = createNativeStackNavigator<RootStack>();

const HomeNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="BottomNaviagtor">
      <Stack.Screen
        name="BottomNaviagtor"
        component={BottomNavigator}
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.containerBg,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
