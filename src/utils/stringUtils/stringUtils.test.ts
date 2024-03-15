import { timeZoneToDisplaySimpleText } from './index';

describe('stringUtils', () => {
  it('Should format a time zone to be displayed simple', () => {
    const result = timeZoneToDisplaySimpleText('America-Sao_Paulo');
    expect(result).toBe('Sao Paulo');
  });
});
