import { timeZoneToDisplayText } from './index';

describe('stringUtils', () => {
  it('Should format a time zone to be displayed', () => {
    const result = timeZoneToDisplayText('America/Sao_Paulo');
    expect(result).toBe('America - Sao Paulo');
  });
});
