import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Clock, Button } from '../../../../components';
import { hour24List, zerotoSixty } from '../../../../utils/lists/clock';
import { ClockTimeType, integerToClockTime } from '../../../../utils/time';

export type TimerDefinitionsProps = {
  preset?: number;
  onSubmit: (timer: number[]) => void;
};

const TimerDefinitions: React.FC<TimerDefinitionsProps> = ({
  preset,
  onSubmit,
}) => {
  const [timer, setTimer] = useState([
    integerToClockTime(preset || 0, ClockTimeType.HOURS),
    integerToClockTime(preset || 0, ClockTimeType.MINUTES),
    integerToClockTime(preset || 0, ClockTimeType.SECONDS),
  ]);

  const handleClockChange = (value: number, index: number) => {
    const timerCopy = [...timer];
    timerCopy[index] = value;
    setTimer(timerCopy);
  };

  return (
    <View style={styles.container}>
      <Clock
        itemsList={[hour24List, zerotoSixty, zerotoSixty]}
        values={timer}
        onChange={handleClockChange}
      />
      <View style={styles.actions}>
        <Button
          block
          disabled={Math.max(...timer) === 0}
          onPress={() => onSubmit(timer)}>
          Iniciar
        </Button>
      </View>
    </View>
  );
};

export default TimerDefinitions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  actions: {
    marginTop: 20,
  },
});
