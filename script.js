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
