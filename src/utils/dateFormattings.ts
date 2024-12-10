import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/nb';

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(updateLocale);

// Set up custom Norwegian format with English language
dayjs.updateLocale('en', {
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
  },
});

/**
 * Get time remaining until a date
 * @param date - Target date
 * @returns Formatted string of time remaining
 */
export const getTimeRemaining = (date: string | Date) => {
  const targetDate = dayjs(date);
  const now = dayjs();

  if (targetDate.isBefore(now)) {
    return 'Ended';
  }

  return targetDate.fromNow(true) + ' left';
};

/**
 * Format date in Norwegian format (DD.MM.YYYY HH:mm)
 * @param date - Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date) => {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
};

/**
 * Format date in long format
 * @param date - Date to format
 * @returns Formatted date string
 */
export const formatLongDate = (date: string | Date) => {
  return dayjs(date).format('D MMMM YYYY [at] HH:mm');
};

/**
 * Format relative calendar date
 * @param date - Date to format
 * @returns Formatted calendar date
 */
export const formatCalendarDate = (date: string | Date) => {
  return dayjs(date).calendar(null, {
    sameDay: '[Today at] HH:mm',
    nextDay: '[Tomorrow at] HH:mm',
    nextWeek: 'dddd [at] HH:mm',
    lastDay: '[Yesterday at] HH:mm',
    lastWeek: '[Last] dddd [at] HH:mm',
    sameElse: 'DD.MM.YYYY HH:mm',
  });
};

/**
 * Check if a date is in the past
 * @param date - Date to check
 * @returns boolean
 */
export const isExpired = (date: string | Date) => {
  return dayjs(date).isBefore(dayjs());
};

/**
 * Get duration between two dates in a specific unit
 * @param dateFrom - Start date
 * @param dateTo - End date
 * @param unit - Unit to return ('minutes' | 'hours' | 'days' | 'months')
 * @returns number
 */
export const getDuration = (
  dateFrom: string | Date,
  dateTo: string | Date,
  unit: 'minutes' | 'hours' | 'days' | 'months' = 'days'
) => {
  return dayjs(dateTo).diff(dayjs(dateFrom), unit);
};
