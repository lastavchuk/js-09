import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  // inputs: [],
};

refs.form.addEventListener('submit', evt => {
  evt.preventDefault();

  // Є сенс таким чином робити змінні?
  // for (const el of refs.form) {
  //   if (el.nodeName === 'INPUT') refs.inputs[el.name] = el.value;
  // }

  if (
    !refs.inputDelay.value ||
    !refs.inputStep.value ||
    !refs.inputAmount.value
  ) {
    Report.warning('All fields must be filled', '', 'OK');
    return;
  }
  const delay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);
  const amount = Number(refs.inputAmount.value);

  if (Number.isNaN(delay) || Number.isNaN(step) || Number.isNaN(amount)) {
    Report.warning('Must be all numbers', '', 'OK');
    return;
  }

  if (delay < 0) {
    Report.warning('First delay cannot be negative', '', 'OK');
    return;
  }
  if (amount <= 0) {
    Report.warning('The Amount must be greater than 0', '', 'OK');
    return;
  }

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          clickToClose: true,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          clickToClose: true,
        });
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) resolve({ position, delay });
      else reject({ position, delay });
    }, delay);
  });
}
