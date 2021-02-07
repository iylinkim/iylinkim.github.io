const nameForm = document.querySelector(".js-nameForm");
const todoForm = document.querySelector(".js-todoForm");
const username = document.querySelector(".js-username");
const todos = document.querySelector(".js-todos");
const list = document.querySelector(".js-list");
let todosArr = [];

const NONE = "none";
const USER_LS = "currentUser";
const TODOS = "todos";

function deleteToDo(e) {
  const targetLi = e.target.parentNode;
  list.removeChild(targetLi);

  const cleanToDos = todosArr.filter(todo => {
    return todo.id !== parseInt(targetLi.id);
  });
  todosArr = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS, JSON.stringify(todosArr));
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleName(e) {
  e.preventDefault();
  const value = username.value;
  username.style.display = NONE;
  saveName(value);
  paintName(value);
}

function paintName(text) {
  const p = document.createElement("p");
  p.innerText = `Hello ${text}`;
  nameForm.append(p);
  username.style.display = NONE;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    nameForm.addEventListener("submit", handleName);
  } else {
    paintName(currentUser);
  }
}

function paintToDos(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btn = document.createElement("button");

  // btn.innerText = "❌";
  
  btn.style.backgroundImage = 'url("./img/delete.png")';
  btn.addEventListener("click", deleteToDo);
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(btn);
  li.id = todosArr.length;
  list.appendChild(li);

  const todoObj = {
    id: todosArr.length,
    text,
  };

  todosArr.push(todoObj);
  saveToDos();
}

function handleToDos(e) {
  e.preventDefault();
  paintToDos(todos.value);
  saveToDos(todosArr);
  todos.value = "";
}

function loadToDos() {
  const todoItem = localStorage.getItem(TODOS);
  const parsedToDo = JSON.parse(todoItem);
  todoForm.addEventListener("submit", handleToDos);

  if (todoItem !== null) {
    parsedToDo.forEach(todo => paintToDos(todo.text));
  }
}

function init() {
  loadName();
  loadToDos();
}
init();
