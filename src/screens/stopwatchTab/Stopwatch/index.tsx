import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Text, Button } from '../../../components';
import { useAppState } from '@react-native-community/hooks';
import { ClockTimeType, integerToClockTime } from '../../../utils/time';
import { useStopwatch } from '../../../hooks';
import { StatusBar } from 'expo-status-bar';

const Stopwatch = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const appState = useAppState();
  const colorScheme = useColorScheme();
  const { setStopwatch, findExistingStopwatch, clearStopwatch } =
    useStopwatch();

  const refTimerInterval = useRef<NodeJS.Timeout>();
  const refLapInterval = useRef<NodeJS.Timeout>();

  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [lapList, setLapList] = useState<number[]>([]);

  const startLapTimmmer = (list: number[]) => {
    const lapCopy = [...list];
    refLapInterval.current = setInterval(() => {
      lapCopy[0] = lapCopy[0] + 17.6;
      setLapList(lapCopy);
    }, 10);
  };

  const startTimmer = (laps: number[]) => {
    refTimerInterval.current = setInterval(
      () => setTimer(value => value + 17.6),
      10,
    );
    startLapTimmmer(laps.length > 0 ? laps : [0]);
    setIsActive(true);
  };

  const stopTimmer = () => {
    setIsActive(false);
    clearInterval(refTimerInterval.current);
    clearInterval(refLapInterval.current);
  };

  const resetTimmer = () => {
    stopTimmer();
    setTimer(0);
    setLapList([]);
    clearStopwatch();
  };

  const newLap = () => {
    clearInterval(refLapInterval.current);
    startLapTimmmer([0, ...lapList]);
  };

  const getLapTextColorByValue = (value: number) => {
    const smallerTimmer = Math.min(...lapList);
    const biggerTimmer = Math.max(...lapList);

    if (value >= biggerTimmer) {
      return theme.danger;
    }
    if (value <= smallerTimmer) {
      return theme.success;
    }

    return theme.darken;
  };

  const formatTimmer = (value: number) => {
    const tens = integerToClockTime(value, ClockTimeType.MILLISECONDS);
    const seconds = integerToClockTime(value, ClockTimeType.SECONDS);
    const minutes = integerToClockTime(value, ClockTimeType.MINUTES);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${Math.floor(tens).toString().slice(0, 2).padStart(2, '0')}`;
  };

  const initStopwatch = async () => {
    const data = await findExistingStopwatch();
    setTimer(data.timer);
    setLapList(data.laps);
    if (!data.paused) {
      startTimmer(data.laps);
    }
  };

  useEffect(() => {
    if (appState === 'active') {
      initStopwatch();
    }
  }, [appState]);

  useEffect(() => {
    if (appState !== 'active' && timer > 0) {
      clearInterval(refTimerInterval.current);
      clearInterval(refLapInterval.current);
      setStopwatch({
        timer,
        laps: lapList,
        paused: !isActive,
      });
    }
  }, [appState, timer, lapList, isActive]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.containerBg}
        translucent
        style={colorScheme === 'light' ? 'dark' : 'light'}
      />
      <View style={styles.timer}>
        <Text size={70} textAlign="center">
          {formatTimmer(timer)}
        </Text>
        <View style={styles.action}>
          <Button
            color={theme.lighthen3}
            textColor={theme.darken}
            disabled={timer === 0}
            onPress={() => (!isActive && timer > 0 ? resetTimmer() : newLap())}>
            {!isActive && timer > 0 ? 'Reiniciar' : 'Volta'}
          </Button>
          <Button
            color={`${isActive ? theme.danger : theme.success}`}
            textColor={theme.lighthen}
            onPress={() => (isActive ? stopTimmer() : startTimmer(lapList))}>
            {isActive ? 'Parar' : 'Iniciar'}
          </Button>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          ...styles.lapContent,
          paddingBottom: safeAreaInsets.bottom + 100,
          borderColor: theme.lighthen3,
        }}>
        {lapList.map((lap, index) => (
          <View
            key={`lap-${index}`}
            style={{ ...styles.lapItem, borderColor: theme.lighthen3 }}>
            <Text
              size={16}
              weight="semibold"
              color={
                lapList.length > 2 ? getLapTextColorByValue(lap) : theme.darken
              }>
              Volta {lapList.length - index}
            </Text>
            <Text
              size={16}
              weight="semibold"
              color={
                lapList.length > 2 ? getLapTextColorByValue(lap) : theme.darken
              }>
              {formatTimmer(lap)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  timer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 30,
  },
  lapContent: {
    padding: 20,
    borderTopWidth: 1,
  },
  lapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
