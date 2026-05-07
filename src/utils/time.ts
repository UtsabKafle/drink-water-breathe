const pad = (value: number) => value.toString().padStart(2, '0');

export const formatTime = (date: Date) =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}`;

export const parseTimeString = (value: string) => {
  const [hoursValue, minutesValue] = value.split(':');
  const hours = Number(hoursValue);
  const minutes = Number(minutesValue);
  const date = new Date();
  date.setHours(Number.isFinite(hours) ? hours : 0);
  date.setMinutes(Number.isFinite(minutes) ? minutes : 0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const parseTimeParts = (value: string) => {
  const [hoursValue, minutesValue] = value.split(':');
  const hour = Number(hoursValue);
  const minute = Number(minutesValue);
  return {
    hour: Number.isFinite(hour) ? hour : 0,
    minute: Number.isFinite(minute) ? minute : 0,
  };
};
