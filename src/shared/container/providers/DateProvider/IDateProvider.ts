export interface IDateProvider {
  dateNow(): Date;
  convertToUTC(date: Date): string;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
  addDays(days: number, date?: Date): Date;
  addHours(hours: number, date?: Date): Date;
}
