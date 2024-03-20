import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ListRingtones } from '../../../../components';
import { AlarmDefinitionRoutes } from '../../../../../routes';
import { RootState } from '../../../../store';
import { updateAlarm } from '../../../../store/reducers/alarmDefinitionReducer';
import { alarmSounds } from '../../../../utils/lists/sound';
import { AlarmSound } from '../../../../interfaces/alarm';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenNavigationProp = NavigationProp<
  AlarmDefinitionRoutes,
  'AlarmRingtonesSelection'
>;

const Ringtones = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { alarm: currentAlarm } = useSelector(
    (state: RootState) => state.alarmDefinition,
  );
  const dispatch = useDispatch();
  const safeAreaInsets = useSafeAreaInsets();

  const handleRepeatChange = (value: AlarmSound) => {
    if (currentAlarm) {
      dispatch(updateAlarm({ ...currentAlarm, sound: value }));
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
      <ListRingtones
        value={currentAlarm?.sound || alarmSounds[0]}
        onSelect={handleRepeatChange}
      />
    </ScrollView>
  );
};

export default Ringtones;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
  },
});
