const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
let interval;
const createTimerAnimator = () => {
  return (seconds) => {
    if (seconds) {
      interval = setInterval(() => {
        const hours = getPadStart(Math.floor(seconds / 3600));
        const minutes = getPadStart(Math.floor((seconds - hours * 3600) / 60));
        const sec = getPadStart(seconds - hours * 3600 - minutes * 60);

        timerEl.innerHTML = `${hours}:${minutes}:${sec}`;
        seconds > 0 ? seconds-- : clearInterval(interval);
      }, 1000);
    }
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа

  inputEl.value = e.target.value.replace(/[^0-9]/g, "");
});

buttonEl.addEventListener("click", () => {
  if (inputEl.value) {
    interval && clearInterval(interval);
    const seconds = Number(inputEl.value);

    animateTimer(seconds);

    inputEl.value = "";
  }
});

function getPadStart(val) {
  return val.toString().padStart(2, "0");
}
