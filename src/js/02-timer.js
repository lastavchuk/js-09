import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

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

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
};

flatpickr('input#datetime-picker', options);

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
    intervalId = setInterval(startCountdown, 1000, userDate);
    refs.btnStart.disabled = true;
  } else wrongDate();
});

function startCountdown(date) {
  const { days, hours, minutes, seconds } = convertMs(date - Date.now());

  refs.spanDays.textContent = addLeadingZero(days);
  refs.spanHours.textContent = addLeadingZero(hours);
  refs.spanMinutes.textContent = addLeadingZero(minutes);
  refs.spanSeconds.textContent = addLeadingZero(seconds);

  if (date - Date.now() < 1000) stopCountdown();
}

function stopCountdown() {
  clearInterval(intervalId);
  intervalId = null;
  refs.btnStart.disabled = true;
  Report.success('Time is up', '', 'OK');
}

function addLeadingZero(value) {
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
  Notify.failure('Please choose a date in the future', { clickToClose: true });
}
