import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text,
  TextInput,
  BlockButton,
  Switch,
  Clock,
  Button,
} from '../../../../components';
import { hour24List, zerotoSixty } from '../../../../utils/lists/clock';
import { formatSelectedWeekList } from '../../../../utils/stringUtils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AlarmDefinitionRoutes } from '../../../../../routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { updateAlarm as updateAlarmReducer } from '../../../../store/reducers/alarmDefinitionReducer';
import { useAlarm } from '../../../../hooks';
import { StatusBar } from 'expo-status-bar';

type ScreenNavigationProp = NavigationProp<
  AlarmDefinitionRoutes,
  'AlarmDefinition'
>;

const Definition = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const { alarm: currentAlarm, isUpdate } = useSelector(
    (state: RootState) => state.alarmDefinition,
  );
  const dispatch = useDispatch();
  const { updateAlarm, setAlarmItem } = useAlarm();
  const safeAreaInsets = useSafeAreaInsets();

  if (!currentAlarm) {
    return null;
  }

  const handleClockChange = (value: number, index: number) => {
    dispatch(
      updateAlarmReducer({
        ...currentAlarm,
        [index === 0 ? 'hour' : 'minute']: value,
      }),
    );
  };

  const handleSubmit = () => {
    if (isUpdate) {
      updateAlarm(currentAlarm);
    } else {
      setAlarmItem({ ...currentAlarm, name: currentAlarm.name || 'Alarm' });
    }
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{ ...styles.container }}
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={{
        paddingBottom: safeAreaInsets.bottom + 30,
      }}>
      <StatusBar
        backgroundColor={theme.containerSecondaryBg}
        translucent
        style={
          colorScheme === 'light' && Platform.OS === 'android'
            ? 'dark'
            : 'light'
        }
      />
      <Clock
        itemsList={[hour24List, zerotoSixty]}
        itemsIndicators={['h', 'm']}
        values={[currentAlarm.hour, currentAlarm.minute]}
        onChange={handleClockChange}
      />
      <View>
        <TextInput
          value={currentAlarm.name}
          bg={theme.containerBg}
          placeholder="Insira um nome para o alarme (opcional)"
          onChangeText={value =>
            dispatch(updateAlarmReducer({ ...currentAlarm, name: value }))
          }
        />
        <View style={styles.blockButtonContainer}>
          <BlockButton
            append={
              <View style={styles.buttonAppend}>
                <Text color={theme.darken2}>
                  {formatSelectedWeekList(currentAlarm.repeat)}
                </Text>
                <Icon name="chevron-right" size={26} color={theme.lighthen3} />
              </View>
            }
            onPress={() => navigation.navigate('AlarmRepeatSelection')}>
            Repetir
          </BlockButton>
          <BlockButton
            append={
              <View style={styles.buttonAppend}>
                <Text color={theme.darken2}>{currentAlarm.sound.name}</Text>
                <Icon name="chevron-right" size={26} color={theme.lighthen3} />
              </View>
            }
            onPress={() => navigation.navigate('AlarmRingtonesSelection')}>
            Som
          </BlockButton>
          <BlockButton
            append={
              <Switch
                value={currentAlarm.snooze}
                onValueChange={value =>
                  dispatch(
                    updateAlarmReducer({ ...currentAlarm, snooze: value }),
                  )
                }
              />
            }>
            Adiar
          </BlockButton>
        </View>
      </View>
      <View style={styles.actions}>
        <Button block onPress={handleSubmit}>
          {isUpdate ? 'Atualizar' : 'Salvar'}
        </Button>
        <Button block outlined onPress={() => navigation.goBack()}>
          Cancelar
        </Button>
      </View>
    </ScrollView>
  );
};

export default Definition;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  blockButtonContainer: {
    gap: 15,
  },
  buttonAppend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    marginTop: 25,
    gap: 5,
  },
});
