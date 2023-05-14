import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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

btnStartEl.addEventListener('click', onStart);

const fp = flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStartEl.setAttribute('disabled', 'true');
    } else {
      btnStartEl.removeAttribute('disabled');
    }
  },
});

function onStart() {
  timerId = setInterval(() => {
    const selectedDate = new Date(inputEl.value);
    resultTime = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(resultTime);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (resultTime <= 1000) {
      clearInterval(timerId);
      spans.forEach(span => {
        span.classList.add('stop-timer');
      });
      labels.forEach(label => {
        label.classList.add('stop-timer');
      });
    }
  }, 1000);
}

function convertMs(ms) {
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

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
