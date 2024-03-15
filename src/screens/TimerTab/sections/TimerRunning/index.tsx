import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from '../../../../components';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dateUtils from '../../../../utils/date';
import { ClockTimeType, integerToClockTime } from '../../../../utils/time';
import { Timer } from '../../../../interfaces/timer';

export type TimerRunningProps = {
  timer: Timer;
  onStatusUpdate: (currentTime: number, status: boolean) => void;
  onCancel: (isOuver: boolean) => void;
};

const TimerRunning: React.FC<TimerRunningProps> = ({
  timer,
  onCancel,
  onStatusUpdate,
}) => {
  const theme = useTheme();

  const screenWidth = Dimensions.get('screen').width;

  const refTimerInterval = useRef<NodeJS.Timeout>();

  const [currentTimer, setCurrentTimer] = useState(timer.lastTimer);

  const startTimmer = useCallback(() => {
    refTimerInterval.current = setInterval(
      () => setCurrentTimer(value => value - 1000),
      1000,
    );
  }, []);

  const getTime = (value: number) => {
    const seconds = integerToClockTime(value, ClockTimeType.SECONDS);
    const minutes = integerToClockTime(value, ClockTimeType.MINUTES);
    const hours = integerToClockTime(value, ClockTimeType.HOURS);
    return [hours, minutes, seconds];
  };

  const formatTimmer = (value: number) => {
    const clockTime = getTime(value);
    let textTimer = '';
    if (clockTime[0] > 0) {
      textTimer = `${clockTime[0].toString().padStart(2, '0')}:`;
    }
    textTimer += `${clockTime[1].toString().padStart(2, '0')}:${clockTime[2].toString().padStart(2, '0')}`;
    return textTimer;
  };

  const pauseTimer = (updateStatus = true) => {
    clearInterval(refTimerInterval.current);
    if (updateStatus) {
      onStatusUpdate(currentTimer, true);
    }
  };

  const resumeTimer = () => {
    onStatusUpdate(currentTimer, false);
  };

  const cancelTimer = (isOuver: boolean) => {
    pauseTimer(!isOuver);
    onCancel(isOuver);
  };

  const alarmOverTime = useMemo(() => {
    const clockTime = getTime(timer.lastTimer);
    const today = dateUtils();
    return today
      .add(clockTime[0], 'hours')
      .add(clockTime[1], 'minutes')
      .add(clockTime[2], 'seconds')
      .format('HH:mm');
  }, [timer]);

  useEffect(() => {
    if (!timer.paused) {
      startTimmer();
    }
  }, [startTimmer, timer.paused]);

  useEffect(() => {
    if (currentTimer <= 0) {
      cancelTimer(true);
    }
  }, [currentTimer]);

  useEffect(() => {
    setCurrentTimer(timer.lastTimer);
  }, [timer]);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={screenWidth - 100}
          width={15}
          fill={currentTimer / (timer.definedTimer / 100)}
          backgroundColor={theme.lighthen2}
          tintColor={theme.primary}>
          {() => (
            <View>
              <View style={styles.clockLabel}>
                <Icon
                  name="bell"
                  size={26}
                  color={timer.paused ? theme.lighthen3 : theme.darken3}
                />
                <Text
                  size={16}
                  color={timer.paused ? theme.lighthen3 : theme.darken3}>
                  {alarmOverTime}
                </Text>
              </View>
              <Text
                color={theme.darken}
                size={screenWidth / 9}
                textAlign="center">
                {formatTimmer(currentTimer)}
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.actions}>
        <Button
          color={theme.lighthen3}
          textColor={currentTimer > 0 ? theme.darken : theme.lighthen}
          onPress={() => cancelTimer(false)}>
          Cancelar
        </Button>
        <Button
          color={theme.primary}
          outlined={!timer.paused}
          onPress={() => (timer.paused ? resumeTimer() : pauseTimer())}>
          {timer.paused ? 'Retomar' : 'Pausar'}
        </Button>
      </View>
    </View>
  );
};

export default TimerRunning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  progressContainer: {
    alignItems: 'center',
  },
  clockLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  actions: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
});
