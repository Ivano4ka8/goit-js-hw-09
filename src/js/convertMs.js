export function convertMs(ms, resultTime) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(resultTime / day);
  const hours = Math.floor((resultTime % day) / hour);
  const minutes = Math.floor(((resultTime % day) % hour) / minute);
  const seconds = Math.floor((((resultTime % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


