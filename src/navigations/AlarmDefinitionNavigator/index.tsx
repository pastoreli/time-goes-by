import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { AlarmDefinitionRoutes, AlarmNavigatorRoutes } from '../../../routes';
import {
  DefinitionScreen,
  RepeatScreen,
  RingtonesScreen,
} from '../../screens/alarmTab/AlarmDefinition';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  initAlarm,
  resetAlarm,
} from '../../store/reducers/alarmDefinitionReducer';
import { useNavigatorUtils } from '../../hooks';

type ScreenRouteProp = RouteProp<AlarmNavigatorRoutes, 'AlarmDefinitionModal'>;

const Stack = createNativeStackNavigator<AlarmDefinitionRoutes>();

const AlarmDefinitionNavigator = () => {
  const theme = useTheme();
  const route = useRoute<ScreenRouteProp>();
  const dispatch = useDispatch();
  const { screenOptions } = useNavigatorUtils();

  const { selectedAlarm } = route?.params;

  useEffect(() => {
    dispatch(initAlarm(selectedAlarm));
  }, [selectedAlarm]);

  useEffect(() => {
    return () => {
      dispatch(resetAlarm());
    };
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="AlarmDefinition"
      screenOptions={{
        ...screenOptions,
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.containerSecondaryBg,
        },
        contentStyle: {
          backgroundColor: theme.containerSecondaryBg,
          paddingTop: 20,
        },
      }}>
      <Stack.Screen
        name="AlarmDefinition"
        component={DefinitionScreen}
        options={{
          title: selectedAlarm ? 'Editar Alarme' : 'Novo Alarme',
        }}
      />
      <Stack.Screen
        name="AlarmRepeatSelection"
        component={RepeatScreen}
        options={{
          title: 'Repetir',
          headerBackTitle: 'Voltar',
        }}
      />
      <Stack.Screen
        name="AlarmRingtonesSelection"
        component={RingtonesScreen}
        options={{
          title: 'Som',
          headerBackTitle: 'Voltar',
        }}
      />
    </Stack.Navigator>
  );
};

export default AlarmDefinitionNavigator;
