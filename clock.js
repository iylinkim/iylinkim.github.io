const clock = document.querySelector('.js-clock');

function getTime(){
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    clock.innerText = `
        ${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}
    `;
}

function init(){
    setInterval(getTime, 1000);
}
init();