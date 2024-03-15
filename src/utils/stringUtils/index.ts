import { WeekDay } from '../../consts';
import { weekDayList } from '../lists/calendar';

const normalize = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
};

const weekDays = [
  WeekDay.MONDAY,
  WeekDay.TUESDAY,
  WeekDay.WEDNESDAY,
  WeekDay.THURSDAY,
  WeekDay.FRIDAY,
];

const weekedsDays = [WeekDay.SATURDAY, WeekDay.SUNDAY];

export const timeZoneToDisplaySimpleText = (timeZone: string) => {
  const split = timeZone.split('-');
  if (split.length > 2) {
    return split[2].trim();
  }
  return split[1].trim();
};

export const searchHandler = (field: string, searchText: string): boolean => {
  const normalizedField = normalize(String(field));
  const normalizedSearchText = normalize(String(searchText));

  return normalizedField.includes(normalizedSearchText);
};

export const formatSelectedWeekList = (
  weekList?: WeekDay[],
  emptyNever?: boolean,
) => {
  if (!weekList || weekList.length === 0) {
    return emptyNever ? '' : 'Nunca';
  }

  if (weekList.length === 7) {
    return 'Todos os dias';
  }

  const values: WeekDay[] = [];
  const texts: string[] = [];

  weekDayList.forEach(item => {
    if (weekList.includes(item.value)) {
      values.push(item.value);
      texts.push(item.text);
    }
  });

  if (values.toString() === weekDays.toString()) {
    return 'Dias da semana';
  }

  if (values.toString() === weekedsDays.toString()) {
    return 'Finais de semana';
  }

  return texts.reduce((result, item, index) => {
    if (index === 0) {
      return item.substring(0, 3);
    }
    if (index < texts.length - 1) {
      return `${result}, ${item.substring(0, 3)}`;
    }
    return `${result} e ${item.substring(0, 3)}`;
  }, '');
};
