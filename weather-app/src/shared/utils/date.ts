import { daysOfWeek, months } from '@/constants/date';

function getLastTimeUpdated(date: number) {
  const oldDate = new Date(date).getTime();
  const currentDate = Date.now();
  const difference = currentDate - oldDate * 1000;

  const differenceInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  const differenceInHours = Math.floor(difference / (1000 * 60 * 60));
  const differenceInMinutes = Math.floor(difference / (1000 * 60));

  if (differenceInDays > 1) return `${differenceInDays} days ago`;
  if (differenceInDays === 1) return 'Yesterday';
  if (differenceInHours > 1) return `${differenceInHours} hours ago`;
  if (differenceInHours === 1) return 'An hour ago';
  if (differenceInMinutes > 1) return `${differenceInMinutes} minutes ago`;
  if (differenceInMinutes <= 1) return 'A minute ago';
}

function getUpdateTime(date: number) {
  const hours = new Date(date * 1000).getHours();
  const minutes = new Date(date * 1000).getMinutes();
  return `${hours}:${minutes}`;
}

function getDayOfWeek(date: number) {
  const day = new Date(date * 1000).getDay();
  return daysOfWeek[day];
}

function getDayOfMonth(date: number) {
  const dayOfMonth = new Date(date * 1000).getDate();
  return dayOfMonth;
}

function getMonth(date: number) {
  const month = new Date(date * 1000).getMonth();
  return months[month];
}

function getMonthInNumbers(date: number) {
  const month = new Date(date * 1000).getMonth();
  return month + 1;
}

function getHour(date: number) {
  const hour = new Date(date * 1000).getHours();
  return hour;
}

const getMinutes = (date: number) => {
  const minutes = new Date(date * 1000).getMinutes();

  return minutes;
};

function isThatDayToday(date: number) {
  const day = new Date(date * 1000).getDate();
  const month = new Date(date * 1000).getMonth();
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();

  return day === today && month === currentMonth;
}

const dateOfLastUpdate = (date: number) => {
  const day = getDayOfWeek(date);
  const month = getMonth(date);
  const dayOfMonth = getDayOfMonth(date);
  return `${day}, ${month} ${dayOfMonth}`;
};

const differenceInHours = (date1: number, date2: number) => {
  const diffInSeconds = Math.abs(date1 - date2);

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);

  return hours + 'hrs ' + minutes + ' mins';
};

const convertHoursInPmAndAm = (date: number) => {
  const hour = getHour(date);

  if (hour === 0) return '12 AM';
  if (hour > 12) return hour - 12 + ' PM';
  if (hour <= 12) return hour + ' AM';
  if (hour === 12) return hour + ' PM';
};

const getHoursAndMinutesInPmAndAmIncludeTimezone = (
  date: number,
  timezone: number
) => {
  const hour = getHour(date);
  const minutes = getMinutes(date);
  const timezoneHour = timezone / 3600;
  const currentTimeZone = new Date(date).getTimezoneOffset() / 60;
  const hourWithTimezone = hour + timezoneHour + currentTimeZone;

  if (hourWithTimezone === 0) return `12:${minutes} AM`;
  if (hourWithTimezone > 12)
    return hourWithTimezone - 12 + ':' + minutes + ' PM';
  if (hourWithTimezone <= 12) return hourWithTimezone + ':' + minutes + ' AM';
  if (hourWithTimezone === 12) return hourWithTimezone + ':' + minutes + ' PM';
};

export {
  getLastTimeUpdated,
  getDayOfWeek,
  getDayOfMonth,
  getMonth,
  getMonthInNumbers,
  getUpdateTime,
  isThatDayToday,
  getHour,
  getMinutes,
  dateOfLastUpdate,
  convertHoursInPmAndAm,
  getHoursAndMinutesInPmAndAmIncludeTimezone,
  differenceInHours,
};
