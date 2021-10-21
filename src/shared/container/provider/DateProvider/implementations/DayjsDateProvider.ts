import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  compareInHours(startDate: Date, endDate: Date): number {
    const end_date_utc = this.convertToUTC(endDate);
    const start_date_utc = this.convertToUTC(startDate);
    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }
  dateNow(): Date {
    return dayjs().toDate();
  }
  compareInDays(startDate: Date, endDate: Date): number {
    const end_date_utc = this.convertToUTC(endDate);
    const start_date_utc = this.convertToUTC(startDate);
    return dayjs(end_date_utc).diff(start_date_utc, 'days');
  }
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
  addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }
  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };
