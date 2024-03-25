import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import dateUtils from '../../../utils/date';
import { Alarm } from '../../../interfaces/alarm';
import { alarmSounds } from '../../../utils/lists/sound';
import { hour24List, zerotoSixty } from '../../../utils/lists/clock';

export type AlarmDefinitionReducerProps = {
  alarm?: Alarm;
  isUpdate: boolean;
};

const initialState: AlarmDefinitionReducerProps = {
  isUpdate: false,
};

const alarmDefinitionReducer = createSlice({
  name: 'alarmDefinition',
  initialState,
  reducers: {
    initAlarm: (state, action: PayloadAction<Alarm | undefined>) => {
      const today = new Date();
      state.alarm = action.payload || {
        id: uuid.v4().toString(),
        hour: hour24List.findIndex(item => item === dateUtils.getHours(today)),
        minute: zerotoSixty.findIndex(
          item => item === dateUtils.getMinutes(today),
        ),
        name: '',
        sound: alarmSounds[0],
        repeat: [],
        snooze: true,
        active: true,
        notifications: [],
      };

      state.isUpdate = !!action.payload;
    },
    updateAlarm: (state, action: PayloadAction<Alarm>) => {
      state.alarm = action.payload;
    },
    resetAlarm: state => {
      state.alarm = undefined;
    },
  },
});

export const { initAlarm, updateAlarm, resetAlarm } =
  alarmDefinitionReducer.actions;

export default alarmDefinitionReducer.reducer;
