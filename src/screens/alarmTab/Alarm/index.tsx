import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { Alarm as Alarmtype } from '../../../interfaces/alarm';
import { useAlarm } from '../../../hooks';
import { Text, EmptyInfo } from '../../../components';
import { AlarmList } from '../sections';
import { AlarmNavigatorRoutes } from '../../../../routes';
import { useNotification } from '../../../contexts/NotificationContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTabBar } from '../../../components/TabBar';
import { useAppState } from '@react-native-community/hooks';
import { FloatingAction, IActionProps } from 'react-native-floating-action';

enum fabIds {
  BT_ADD = 'btn_add',
  BT_EDIT = 'btn_edit',
}

type ScreenNavigationProp = NavigationProp<AlarmNavigatorRoutes, 'Alarm'>;

const Alarm = () => {
  const theme = useTheme();
  const navigation = useNavigation<ScreenNavigationProp>();
  const { alarmNotificationAction } = useNotification();
  const screenIsFocused = useIsFocused();
  const safeAreaInsets = useSafeAreaInsets();
  const { tabBarDistance } = useTabBar();
  const appState = useAppState();
  const {
    alarmEditMode,
    toogleEditMode,
    alarmList,
    updateAlarmList,
    deleteAlarmItem,
    toogleActiveAlarm,
    refetchAlarmList,
  } = useAlarm();

  const fabActions: IActionProps[] = [
    {
      icon: <Icon name="plus" size={25} color={theme.lighthen} />,
      name: fabIds.BT_ADD,
      color: theme.primary,
    },
    {
      icon: <Icon name="pencil-outline" size={22} color={theme.lighthen} />,
      name: fabIds.BT_EDIT,
      color: theme.primary,
    },
  ];

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

  const RightNavButton = useCallback(
    () => (
      <Pressable
        testID={testIds.NAV_RIGHT_BUTTON}
        onPress={() => handleGoToDefinitions()}>
        <Icon name="plus" size={30} color={theme.primary} />
      </Pressable>
    ),
    [theme.primary, handleGoToDefinitions],
  );

  const LeftNavButton = useCallback(
    () => (
      <Pressable testID={testIds.NAV_LEFT_BUTTON} onPress={toogleEditMode}>
        <Text size={18} weight="medium" color={theme.primary}>
          {alarmEditMode ? 'Concluir' : 'Editar'}
        </Text>
      </Pressable>
    ),
    [theme.primary, toogleEditMode, alarmEditMode],
  );

  const handleFabActions = (id: fabIds) => {
    if (id === fabIds.BT_ADD) {
      handleGoToDefinitions();
    } else {
      toogleEditMode();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft:
        alarmList.length > 0 && Platform.OS === 'ios'
          ? LeftNavButton
          : undefined,
      headerRight:
        alarmList.length > 0 && Platform.OS === 'ios'
          ? RightNavButton
          : undefined,
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

  if (alarmList.length === 0) {
    return (
      <View
        style={{
          ...styles.emptyContainer,
          paddingBottom: tabBarDistance + 15,
        }}>
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
      {Platform.OS === 'android' && (
        <FloatingAction
          actions={alarmEditMode ? undefined : fabActions}
          color={theme.primary}
          buttonSize={60}
          distanceToEdge={{
            vertical: tabBarDistance + 20,
            horizontal: alarmEditMode ? 0 : 30,
          }}
          position={alarmEditMode ? 'center' : 'right'}
          floatingIcon={
            alarmEditMode ? (
              <Icon name="check" size={30} color="#FFFFFF" />
            ) : undefined
          }
          onPressMain={() => (alarmEditMode ? toogleEditMode() : undefined)}
          onPressItem={id =>
            alarmEditMode ? undefined : handleFabActions(id as fabIds)
          }
        />
      )}
    </View>
  );
};

export default Alarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
  },
});

export enum testIds {
  NAV_LEFT_BUTTON = 'WorldClock-nav-left-button',
  NAV_RIGHT_BUTTON = 'WorldClock-nav-right-button',
}
