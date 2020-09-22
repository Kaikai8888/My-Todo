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

//Prioritize(drag and drop):
// reference source: https://pjchender.blogspot.com/2017/08/html5-drag-and-drop-api.html

//drag source setting
items.forEach((item) => addDragSetting);
let dragItem;

function addDragSetting(item) {
  item.draggable = "true";
  //drag source setting
  item.addEventListener("dragstart", dragStart);
  //drop target setting
  item.addEventListener("drop", dropped);
  item.addEventListener("dragenter", cancelDefault);
  item.addEventListener("dragover", cancelDefault);
}

function dragStart(e) {
  const index = $(e.target).index();
  e.dataTransfer.setData("text/plain", index);
  dragItem = this;
}

function dropped(e) {
  cancelDefault(e);

  //get old and new location index
  const oldIndex = $(dragItem).index();
  const newIndex = $(this).index();

  const curItems = document.querySelectorAll("#my-todo > li");
  if (dragItem.parentElement.id !== "done") {
    if (oldIndex < newIndex) {
      this.after(curItems[oldIndex]);
    } else {
      this.before(curItems[oldIndex]);
    }
  } else if (this.parentElement.id === "my-todo") {
    dragItem.firstElementChild.classList.remove("checked");
    this.after(dragItem);
  }
}

function cancelDefault(e) {
  e.preventDefault();
  return false;
}
