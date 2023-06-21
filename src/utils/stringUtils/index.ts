export const timeZoneToDisplayText = (timeZone: string) =>
  timeZone.replace(/\//g, ' - ').replace(/_/g, ' ');

export const timeZoneToDisplaySimpleText = (timeZone: string) =>
  timeZone.split('/')[1].replace(/_/g, ' ');
