import { NativeModules } from 'react-native';

const { LiveTimer } = NativeModules;

export type StartLiveTimerActivityParama = {
  timerValue: string;
};

export type LiveTimerActivityProps = {
  startActivity: (data: StartLiveTimerActivityParama) => void;
  endActivity: () => void;
};

const LiveTimerActivity: LiveTimerActivityProps = {
  startActivity: LiveTimer.startActivity,
  endActivity: LiveTimer.endActivity,
};

export default LiveTimerActivity;
