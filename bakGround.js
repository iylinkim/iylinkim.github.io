const body = document.querySelector("body");

function getRandomNumber() {
  const nums = Math.floor(Math.random() * 5);
  body.style.backgroundImage = `url(./img/bak${nums}.jpg)`;
}

function init() {
  getRandomNumber();
}

init();
