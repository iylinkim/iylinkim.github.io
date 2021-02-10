const nameForm = document.querySelector(".js-nameForm");
const todoForm = document.querySelector(".js-todoForm");
const username = document.querySelector(".js-username");
const todos = document.querySelector(".js-todos");
const list = document.querySelector(".js-list");
const select = document.querySelector(".js-select");
const checkbox = document.querySelector(".js-checkbox");
const submit = document.querySelector(".js-submit");
const done = document.querySelector(".js-done");
const proceeding = document.querySelector(".js-proceeding");
let todosArr = [];

const NONE = "none";
const USER_LS = "currentUser";
const TODOS = "todos";
const DONE = "done";
let count = localStorage.getItem(DONE);


function deleteToDo(e) {
  count++;
  const targetLi = e.target.parentNode;
  list.removeChild(targetLi);

  const cleanToDos = todosArr.filter((todo) => {
    return todo.id !== parseInt(targetLi.id);
  });
  todosArr = cleanToDos;
  saveToDos();
  saveDone();
  getStatus();
}

function saveToDos() {
  localStorage.setItem(TODOS, JSON.stringify(todosArr));
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function saveDone() {
  localStorage.setItem(DONE, count);
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

function paintToDos(text, cate, imp) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btn = document.createElement("button");
  const p = document.createElement("p");

  p.innerText = cate;
  p.className = `category ${getCateName(cate)}`;
  btn.classList.add("delete_btn");
  btn.addEventListener("click", deleteToDo);
  span.innerText = `${text}`;

  li.appendChild(span);
  li.appendChild(p);
  li.appendChild(btn);
  li.id = todosArr.length;
  list.appendChild(li);

  const todoObj = {
    id: todosArr.length,
    text,
    category: cate,
    important: imp,
  };

  //checkbox가 체크 되어있을 때
  if (imp) {
    li.classList.add("important");
  }
  todosArr.push(todoObj);

  saveToDos();
}

function handleToDos(e) {
  e.preventDefault();
  paintToDos(todos.value, select.value, checkbox.checked);
  saveToDos();
  submit.classList.add("clicked");
  todos.value = "";
  getStatus();
}

function loadToDos() {
  const todoItem = localStorage.getItem(TODOS);
  const parsedToDo = JSON.parse(todoItem);
  todoForm.addEventListener("submit", handleToDos);

  if (todoItem !== null) {
    parsedToDo.forEach((todo) => {
      console.log(todo);
      paintToDos(todo.text, todo.category, todo.important);
    });
  }
}

function getCateName(name) {
  switch (name) {
    case "Javascript":
      return "js";
      break;
    case "Java":
      return "java";
      break;
    case "C":
      return "c";
      break;
    case "C++":
      return "c_pl";
      break;
    case "Python":
      return "python";
      break;
    case "Algoritum":
      return "algo";
      break;
    case "Projects":
      return "proj";
      break;
    default:
      return "js";
  }
}

function getStatus() {
  done.innerText = localStorage.getItem(DONE);
  proceeding.innerText = todosArr.length;
}
function init() {
  loadName();
  loadToDos();
  getStatus();
  // if(count === undefined){
  //   count = 0;
  // }
  console.log(todosArr);
}
init();
