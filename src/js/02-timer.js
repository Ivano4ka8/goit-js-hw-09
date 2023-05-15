import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

import { addLeadingZero } from './padstart';
import { convertMs } from './convertMs';

let timerId = null;
let resultTime;

const inputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const spans = document.querySelectorAll('.value');
const labels = document.querySelectorAll('.label');

const fp = flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      btnStartEl.setAttribute('disabled', ' ');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success(
        "You choose a right date, click on the button 'Start' "
      );
      btnStartEl.removeAttribute('disabled');
      btnStartEl.addEventListener('click', onStart);
    }
  },
});

function onStart() {
  btnStartEl.setAttribute('disabled', ' ');
  Notiflix.Notify.info('Timer is running');

  timerId = setInterval(() => {
    const selectedDate = new Date(inputEl.value);
    resultTime = selectedDate - Date.now();

    const { days, hours, minutes, seconds } = convertMs(resultTime, resultTime);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (resultTime <= 0) {
      Notiflix.Notify.info('The timer is ended. Please choose a new date');
      clearInterval(timerId);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      btnStartEl.removeAttribute('disabled');
      return;
    }
  }, 1000);
}
