import { NativeModules, Platform } from 'react-native';

const { LiveTimer } = NativeModules;

export type StartLiveTimerActivityParama = {
  timerValue: string;
};

export type LiveTimerActivityProps = {
  startActivity: (data: StartLiveTimerActivityParama) => void;
  endActivity: () => void;
};

const handleStartActivity = (data: StartLiveTimerActivityParama) => {
  if (Platform.OS === 'ios') {
    LiveTimer.startActivity(data);
  }
};

const handleEndActivity = () => {
  if (Platform.OS === 'ios') {
    LiveTimer.endActivity();
  }
};

const LiveTimerActivity: LiveTimerActivityProps = {
  startActivity: handleStartActivity,
  endActivity: handleEndActivity,
};

export default LiveTimerActivity;
