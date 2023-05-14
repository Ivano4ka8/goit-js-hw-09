
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

btnStartEl.addEventListener('click', onStart);
btnStopEl.addEventListener('click', onStop);

function onStart() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStartEl.setAttribute('disabled', 'true');
}

function onStop() {
  clearInterval(timerId);
  btnStartEl.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
