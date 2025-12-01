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

export {
  getLastTimeUpdated,
  getDayOfWeek,
  getDayOfMonth,
  getMonth,
  getMonthInNumbers,
  getUpdateTime,
  isThatDayToday,
  getHour,
  dateOfLastUpdate,
};
