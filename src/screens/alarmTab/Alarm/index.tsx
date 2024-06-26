import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Platform,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { Alarm as Alarmtype } from '../../../interfaces/alarm';
import { useAlarm } from '../../../hooks';
import { Text, EmptyInfo } from '../../../components';
import { AlarmList } from '../sections';
import { AlarmNavigatorRoutes } from '../../../../routes';
import { useNotification } from '../../../contexts/NotificationContext';
import { useTabBar } from '../../../components/TabBar';
import { useAppState } from '@react-native-community/hooks';
import { StatusBar } from 'expo-status-bar';

type ScreenNavigationProp = NavigationProp<AlarmNavigatorRoutes, 'Alarm'>;
type ScreenRouteProp = RouteProp<AlarmNavigatorRoutes, 'Alarm'>;

const Alarm = () => {
  const theme = useTheme();
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { alarmNotificationAction } = useNotification();
  const screenIsFocused = useIsFocused();
  const { tabBarDistance } = useTabBar();
  const appState = useAppState();
  const colorScheme = useColorScheme();
  const {
    alarmEditMode,
    toogleEditMode,
    alarmList,
    updateAlarmList,
    deleteAlarmItem,
    toogleActiveAlarm,
    refetchAlarmList,
  } = useAlarm();

  const { openDefinitions } = route.params || {};

  useEffect(() => {
    if (screenIsFocused) {
      refetchAlarmList();
    }
  }, [screenIsFocused]);

  useEffect(() => {
    alarmNotificationAction?.(refetchAlarmList);
  }, [alarmNotificationAction]);

  const handleGoToDefinitions = useCallback(
    (data?: Alarmtype) => {
      if (alarmEditMode) {
        toogleEditMode();
      }
      navigation.navigate('AlarmDefinitionModal', {
        selectedAlarm: data,
      });
    },
    [navigation, alarmEditMode],
  );

  const RightNavButton = useCallback(() => {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.androidButtons}>
          {!alarmEditMode && (
            <Pressable
              testID={testIds.NAV_ADD_BUTTON}
              onPress={() => handleGoToDefinitions()}>
              <Icon name="plus" size={30} color={theme.darken} />
            </Pressable>
          )}
          <Pressable testID={testIds.NAV_EDIT_BUTTON} onPress={toogleEditMode}>
            <Icon
              name={alarmEditMode ? 'check' : 'pencil-outline'}
              size={alarmEditMode ? 30 : 26}
              color={theme.darken}
            />
          </Pressable>
        </View>
      );
    }

    return (
      <Pressable
        testID={testIds.NAV_ADD_BUTTON}
        onPress={() => handleGoToDefinitions()}>
        <Icon name="plus" size={30} color={theme.primary} />
      </Pressable>
    );
  }, [theme, alarmEditMode, toogleEditMode, handleGoToDefinitions]);

  const LeftNavButton = useCallback(() => {
    if (Platform.OS === 'android') {
      return null;
    }

    return (
      <Pressable testID={testIds.NAV_EDIT_BUTTON} onPress={toogleEditMode}>
        <Text size={18} weight="medium" color={theme.primary}>
          {alarmEditMode ? 'Concluir' : 'Editar'}
        </Text>
      </Pressable>
    );
  }, [theme.primary, toogleEditMode, alarmEditMode]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: alarmList.length > 0 ? LeftNavButton : undefined,
      headerRight: alarmList.length > 0 ? RightNavButton : undefined,
    });
  }, [RightNavButton, LeftNavButton, navigation, alarmList]);

  useEffect(() => {
    if (alarmList.length < 1 && alarmEditMode) {
      toogleEditMode();
    }
  }, [alarmList, alarmEditMode]);

  useEffect(() => {
    if (appState === 'active') {
      refetchAlarmList();
    }
  }, [appState]);

  useEffect(() => {
    if (openDefinitions) {
      handleGoToDefinitions();
    }
  }, [openDefinitions, handleGoToDefinitions]);

  if (alarmList.length === 0) {
    return (
      <View
        style={{
          ...styles.emptyContainer,
          paddingBottom: tabBarDistance + 15,
        }}>
        <StatusBar
          backgroundColor={theme.containerBg}
          translucent
          style={colorScheme === 'light' ? 'dark' : 'light'}
        />
        <EmptyInfo
          icon="alarm"
          title="Você ainda não configurou um alarme!"
          actionText="Adicionar"
          onActionPress={() => handleGoToDefinitions()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.containerBg}
        translucent
        style={colorScheme === 'light' ? 'dark' : 'light'}
      />
      <View style={styles.list}>
        <AlarmList
          list={alarmList}
          editMode={alarmEditMode}
          onListChange={updateAlarmList}
          onToggleActiveAlarm={toogleActiveAlarm}
          onDelete={deleteAlarmItem}
          onSelect={handleGoToDefinitions}
        />
      </View>
    </View>
  );
};

export default Alarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  androidButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 15,
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
  },
});

export enum testIds {
  NAV_EDIT_BUTTON = 'WorldClock-nav-left-button',
  NAV_ADD_BUTTON = 'WorldClock-nav-right-button',
}
