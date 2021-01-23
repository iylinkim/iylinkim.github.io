const nameForm = document.querySelector('.js-nameForm');
const todoForm = document.querySelector('.js-todoForm');
const username = document.querySelector('.js-username');
const todos = document.querySelector('.js-todos');

const NONE = 'none';
const USER_LS = 'currentUser';



function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleName(e){
    e.preventDefault();
    const value = username.value;
    username.style.display = NONE;
    saveName(value);
    paintName(value);
}

function paintName(text){
    const p = document.createElement("p");
    p.innerText = `Hello ${text}`;
    nameForm.append(p);
    username.style.display = NONE;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    console.log(currentUser);
    if(currentUser === null){
        nameForm.addEventListener('submit', handleName);
    }else{
        paintName(currentUser);
    }
}

function init (){
    loadName();
}
init();