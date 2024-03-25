import * as dateFns from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz';

dateFns.setDefaultOptions({
  locale: ptBR,
});

export default {
  ...dateFns,
  formatInTimeZone,
  utcToZonedTime,
};
