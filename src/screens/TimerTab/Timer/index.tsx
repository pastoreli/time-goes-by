import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useColorScheme, Platform } from 'react-native';
import { TimerDefinitions, TimerRunning } from '../sections';
import { ClockTimeType, clockTimeToInteger } from '../../../utils/time';
import { useTimer } from '../../../hooks';
import { useAppState } from '@react-native-community/hooks';
import { Timer as TimerType } from '../../../interfaces/timer';
import {
  AndroidChannelGroups,
  AndroidChannels,
  NotificationActionsGroup,
  NotificationId,
} from '../../../consts';
import {
  RepeatNotificatonType,
  cancelScheduleNotifications,
  scheduleNotifications,
} from '../../../utils/notification';
import { androidSimpleStopActions } from '../../../utils/lists/notifications';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components/native';

const AndroidChannelGroup = AndroidChannelGroups.TIMER;

const Timer = () => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const {
    timer: currentTimer,
    setTimer,
    findExistingTimer,
    clearTimer,
    setLastSetTimer,
    getLastSetTimer,
  } = useTimer();
  const appState = useAppState();

  const [presetTimer, setPresetTimer] = useState(0);
  const [presetIsLoading, setPresetIsLoading] = useState(false);

  const defineNotification = async (timer: TimerType) => {
    cancelNotification();
    scheduleNotifications({
      id: NotificationId.TIMER,
      channel: {
        channelGroupId: AndroidChannelGroup.id,
        channelGroupName: AndroidChannelGroup.name,
        channelId: AndroidChannels.TIMERS,
        channelName: AndroidChannels.TIMERS,
      },
      config: {
        title: 'Time Goes By',
        body: 'Temporizador',
        ios: {
          sound: 'alarm_1.mp3',
          interruptionLevel: 'critical',
          critical: true,
          criticalVolume: 1,
          categoryId: NotificationActionsGroup.SIMPLE_STOP,
        },
        android: {
          sound: 'alarm_1.mp3',
          pressAction: {
            id: 'default',
          },
          actions: androidSimpleStopActions,
        },
        data: {
          id: NotificationId.TIMER,
          catergoryId: NotificationId.TIMER,
          screen: 'TimerTab',
        },
      },
      trigger: {
        date: timer.endDate,
        repeat:
          Platform.OS === 'android'
            ? RepeatNotificatonType.ONLY_ONE
            : RepeatNotificatonType.ALL,
      },
    });
  };

  const cancelNotification = () => {
    cancelScheduleNotifications({
      id: NotificationId.TIMER,
      repeat: RepeatNotificatonType.ALL,
    });
  };

  // Param: timer -> timer[0] = hours | timer[1] = minutes | timer[2] = seconds
  const startTimer = (timer: number[]) => {
    let timerTotal = clockTimeToInteger(timer[0], ClockTimeType.HOURS);
    timerTotal += clockTimeToInteger(timer[1], ClockTimeType.MINUTES);
    timerTotal += clockTimeToInteger(timer[2], ClockTimeType.SECONDS);
    const definedTimer = setTimer(timerTotal);
    defineNotification(definedTimer);
    setLastSetTimer(timerTotal);
  };

  const handleCancel = (isOuver: boolean) => {
    if (!isOuver) {
      cancelNotification();
    }
    clearTimer();
  };

  const handleStatusUpdate = (timerValue: number, paused: boolean) => {
    const result = setTimer(timerValue, paused);
    if (paused) {
      cancelNotification();
    } else {
      defineNotification(result);
    }
  };

  useEffect(() => {
    if (appState === 'active') {
      findExistingTimer();
    }
  }, [appState]);

  const getPresetTimer = async () => {
    setPresetIsLoading(true);
    const preset = await getLastSetTimer();
    setPresetTimer(preset);
    setPresetIsLoading(false);
  };

  useEffect(() => {
    if (currentTimer === undefined) {
      getPresetTimer();
    }
  }, [currentTimer]);

  if (presetIsLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.containerBg}
        translucent
        style={colorScheme === 'light' ? 'dark' : 'light'}
      />
      {currentTimer !== undefined ? (
        <TimerRunning
          timer={currentTimer}
          onCancel={handleCancel}
          onStatusUpdate={handleStatusUpdate}
        />
      ) : (
        <TimerDefinitions preset={presetTimer} onSubmit={startTimer} />
      )}
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
