export const timeZoneToDisplayText = (timeZone: string) =>
  timeZone.replace(/\//g, ' - ').replace(/_/g, ' ');
