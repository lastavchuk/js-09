import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0].getTime();
    isOk = userDate >= Date.now() ? true : false;
    if (isOk) {
      refs.btnStart.disabled = false;
    } else wrongDate();
  },
};

flatpickr('input#datetime-picker', options);

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
};

refs.btnStart.disabled = true;

let userDate;
let intervalId;
let isOk = false;

refs.btnStart.addEventListener('click', () => {
  if (isOk) {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    intervalId = setInterval(showCountdown, 1000, userDate);
  } else wrongDate();
});

function showCountdown(date) {
  const dateObj = convertMs(date - Date.now());
  const { days, hours, minutes, seconds } = dateObj;

  refs.spanDays.textContent = pad(days);
  refs.spanHours.textContent = pad(hours);
  refs.spanMinutes.textContent = pad(minutes);
  refs.spanSeconds.textContent = pad(seconds);

  // Коли закінчується відлік, остання секунда залишається на екрані
  // поки не клікнути OK на модальному вікні
  // Як це пофіксити?

  if (seconds === 0) {
    let isStop = Object.values(dateObj).every(el => el === 0);
    if (isStop) stopCountdown();
  }
}

function stopCountdown() {
  clearInterval(intervalId);
  intervalId = null;
  refs.btnStart.disabled = true;
  alert('Time is up');
}

function pad(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function wrongDate() {
  refs.btnStart.disabled = true;
  alert('Please choose a date in the future');
}
