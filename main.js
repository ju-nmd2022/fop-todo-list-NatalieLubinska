let addToDoButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField");
let toDoList = [];

// Retrieve saved to-do list from local storage
let savedToDoList = localStorage.getItem("toDoList");
if (savedToDoList) {
  toDoList = JSON.parse(savedToDoList);
}

// Create to-do list elements from saved to-do list
for (let i = 0; i < toDoList.length; i++) {
  let paragraph = document.createElement("p");
  paragraph.classList.add("paragraph-styling");
  paragraph.innerText = toDoList[i].text;
  if (toDoList[i].completed) {
    paragraph.style.textDecoration = "line-through";
  }
  toDoContainer.appendChild(paragraph);
  paragraph.addEventListener("click", function () {
    toDoList[i].completed = !toDoList[i].completed;
    if (toDoList[i].completed) {
      paragraph.style.textDecoration = "line-through";
    } else {
      paragraph.style.textDecoration = "none";
    }
    // Update saved to-do list in local storage
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  });
  paragraph.addEventListener("dblclick", function () {
    toDoContainer.removeChild(paragraph);
    toDoList.splice(i, 1);
    // Update saved to-do list in local storage
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  });
}

addToDoButton.addEventListener("click", function () {
  let newToDo = {
    text: inputField.value,
    completed: false,
  };
  toDoList.push(newToDo);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  let paragraph = document.createElement("p");
  paragraph.classList.add("paragraph-styling");
  paragraph.innerText = inputField.value;
  toDoContainer.appendChild(paragraph);
  inputField.value = "";
  paragraph.addEventListener("click", function () {
    newToDo.completed = !newToDo.completed;
    if (newToDo.completed) {
      paragraph.style.textDecoration = "line-through";
    } else {
      paragraph.style.textDecoration = "none";
    }
    // Update saved to-do list in local storage
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  });
  paragraph.addEventListener("dblclick", function () {
    toDoContainer.removeChild(paragraph);
    toDoList.splice(toDoList.indexOf(newToDo), 1);
    // Update saved to-do list in local storage
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  });
});
