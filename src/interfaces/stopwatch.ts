export type Stopwatch = {
  inactiveDate: number;
  timer: number;
  laps: number[];
  paused: boolean;
};

export type StopwatchNormalized = Omit<Stopwatch, 'inactiveDate'>;
