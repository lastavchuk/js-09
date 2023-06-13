const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let startId;

refs.btnStop.disabled = true;

refs.btnStart.addEventListener('click', () => {
  startId = setInterval(startRandomBackroundColor, 1000);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
});

refs.btnStop.addEventListener('click', () => {
  clearInterval(startId);
  startId = null;
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
});

function startRandomBackroundColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
