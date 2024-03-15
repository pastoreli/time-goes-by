import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { WorldClockChooseRoutes } from '../../../routes';
import { ChooseScreen } from '../../screens/worldClockTab/WorldClockChoose';
import { useNavigatorUtils } from '../../hooks';

const Stack = createNativeStackNavigator<WorldClockChooseRoutes>();

const AlarmDefinitionNavigator = () => {
  const theme = useTheme();
  const { screenOptions } = useNavigatorUtils();

  return (
    <Stack.Navigator
      initialRouteName="WorldClockChoose"
      screenOptions={{
        ...screenOptions,
        headerShown: true,
        contentStyle: {
          backgroundColor: theme.containerSecondaryBg,
          paddingTop: 20,
        },
      }}>
      <Stack.Screen
        name="WorldClockChoose"
        component={ChooseScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AlarmDefinitionNavigator;
