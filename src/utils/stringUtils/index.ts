const normalize = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
};

export const timeZoneToDisplayText = (timeZone: string) =>
  timeZone.replace(/\//g, ' - ').replace(/_/g, ' ');

export const timeZoneToDisplaySimpleText = (timeZone: string) =>
  timeZone.split('/')[1].replace(/_/g, ' ');

export const searchHandler = (field: string, searchText: string): boolean => {
  const normalizedField = normalize(String(field));
  const normalizedSearchText = normalize(String(searchText));

  return normalizedField.includes(normalizedSearchText);
};
