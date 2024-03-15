export enum ClockTimeType {
  MILLISECONDS = 'milliseconds',
  SECONDS = 'seconds',
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
}

export const clockTimeToInteger = (value: number, type: ClockTimeType) => {
  switch (type) {
    case ClockTimeType.MILLISECONDS:
      return value;
    case ClockTimeType.SECONDS:
      return value * 1000;
    case ClockTimeType.MINUTES:
      return value * 60000;
    case ClockTimeType.HOURS:
      return value * 3600000;
    case ClockTimeType.DAYS:
      return value * 86400000;
    case ClockTimeType.WEEKS:
      return value * 604800000;
  }
};

export const integerToClockTime = (value: number, type: ClockTimeType) => {
  switch (type) {
    case ClockTimeType.MILLISECONDS:
      return Math.floor(value % 1000);
    case ClockTimeType.SECONDS:
      return Math.floor((value % 60000) / 1000);
    case ClockTimeType.MINUTES:
      return Math.floor((value % 3600000) / 60000);
    case ClockTimeType.HOURS:
      return Math.floor((value % 216000000) / 3600000);
    default:
      return 0;
  }
};
