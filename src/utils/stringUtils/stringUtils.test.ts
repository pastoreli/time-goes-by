import { timeZoneToDisplayText, timeZoneToDisplaySimpleText } from './index';

describe('stringUtils', () => {
  it('Should format a time zone to be displayed', () => {
    const result = timeZoneToDisplayText('America/Sao_Paulo');
    expect(result).toBe('America - Sao Paulo');
  });
  it('Should format a time zone to be displayed simple', () => {
    const result = timeZoneToDisplaySimpleText('America/Sao_Paulo');
    expect(result).toBe('Sao Paulo');
  });
});
