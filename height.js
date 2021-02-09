const wrap = document.getElementById("wrap");

function handleHeight() {
  const windowH = window.innerHeight*0.96;
  wrap.style.height = windowH + "px";
}

function init() {
  handleHeight();
  window.addEventListener("resize", handleHeight);
}
init();
