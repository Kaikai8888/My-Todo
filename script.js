// init
const list = document.querySelector("#my-todo");
let items = document.querySelectorAll("#my-todo > li");
const done = document.querySelector(`#done`);
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills",
];

for (let todo of todos) {
  addItem(todo);
}

function addItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
  addDragSetting(newItem);
}

// Create and clear input
const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", (event) => {
  readAndCreate(event);
  event.target.previousElementSibling.value = "";
});

const input = document.querySelector("#newTodo");
input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    readAndCreate(event);
    event.target.value = "";
  }
});

function readAndCreate(event) {
  const inputValue = document.querySelector("#newTodo").value;
  if (inputValue) {
    addItem(inputValue);
  }
}

// Delete ,check
const main = document.querySelector("main");
main.addEventListener("click", function (event) {
  const li = event.target.parentElement;
  if (event.target.classList.contains("delete")) {
    li.remove();
  } else if (event.target.tagName === "LABEL") {
    event.target.classList.toggle("checked");
    if (li.parentElement.id === "my-todo") {
      done.appendChild(li);
    } else {
      list.appendChild(li);
    }
  }
});
