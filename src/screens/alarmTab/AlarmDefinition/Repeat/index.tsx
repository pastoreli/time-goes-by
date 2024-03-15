import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { WeekDay } from '../../../../consts';
import { ListWeek } from '../../../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AlarmDefinitionRoutes } from '../../../../../routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { Alarm } from '../../../../interfaces/alarm';
import { updateAlarm } from '../../../../store/reducers/alarmDefinitionReducer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenNavigationProp = NavigationProp<
  AlarmDefinitionRoutes,
  'AlarmRepeatSelection'
>;

const Repeat = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { alarm: currentAlarm } = useSelector(
    (state: RootState) => state.alarmDefinition,
  );
  const dispatch = useDispatch();
  const safeAreaInsets = useSafeAreaInsets();

  const handleRepeatChange = (value: WeekDay) => {
    if (currentAlarm) {
      const currentAlarmCopy = JSON.parse(
        JSON.stringify(currentAlarm),
      ) as Alarm;
      const newRepeat = currentAlarmCopy.repeat.filter(item => item !== value);
      if (newRepeat.length !== currentAlarmCopy.repeat.length) {
        currentAlarmCopy.repeat = newRepeat;
      } else {
        currentAlarmCopy.repeat = [...currentAlarmCopy.repeat, value];
      }
      dispatch(updateAlarm(currentAlarmCopy));
    }
  };

  useEffect(() => {
    navigation.setOptions({});
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
        paddingBottom: safeAreaInsets.bottom + 10,
      }}>
      <ListWeek
        value={currentAlarm?.repeat || []}
        onSelect={handleRepeatChange}
      />
    </ScrollView>
  );
};

export default Repeat;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
});
