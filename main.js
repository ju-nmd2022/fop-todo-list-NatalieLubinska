//ChatGPT helped me solve problems using localstorage and JSON

let addToDoButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField");
//empty to-do list array
let toDoList = [];

//retrieve saved to-do list from local storage
let savedToDoList = localStorage.getItem("toDoList");
if (savedToDoList) {
  toDoList = JSON.parse(savedToDoList);
}

//create to-do list elements from saved to-do list
for (let i = 0; i < toDoList.length; i++) {
  let paragraph = document.createElement("p");
  paragraph.classList.add("paragraph-styling");
  paragraph.innerText = toDoList[i].text;
  //if to-do completed = add line-through
  if (toDoList[i].completed) {
    paragraph.style.textDecoration = "line-through";
  }

  toDoContainer.appendChild(paragraph);
  //click-event listener to toggle completed or not
  paragraph.addEventListener("click", function () {
    toDoList[i].completed = !toDoList[i].completed;
    //update paragraph style if completed
    if (toDoList[i].completed) {
      paragraph.style.textDecoration = "line-through";
    } else {
      paragraph.style.textDecoration = "none";
    }
    //save updated to-do list in local storage
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  });
  //added double-click event listener to remove to-dos
  paragraph.addEventListener("dblclick", function () {
    toDoContainer.removeChild(paragraph);
    toDoList.splice(i, 1);
    //save to-do list in local storage
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  });
}

addToDoButton.addEventListener("click", function () {
  let newToDo = {
    text: inputField.value,
    completed: false,
  };
  //add new to-do to list array
  toDoList.push(newToDo);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  //create new paragraph element for new to-dos
  let paragraph = document.createElement("p");
  paragraph.classList.add("paragraph-styling");
  paragraph.innerText = inputField.value;
  //add paragraph element to to-do container
  toDoContainer.appendChild(paragraph);
  //clear input field
  inputField.value = "";
  //click listener to toggle to-do status
  paragraph.addEventListener("click", function () {
    newToDo.completed = !newToDo.completed;
    if (newToDo.completed) {
      paragraph.style.textDecoration = "line-through";
    } else {
      paragraph.style.textDecoration = "none";
    }
    //update saved to-do list in local storage
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  });
  //double click listener to remove new todos
  paragraph.addEventListener("dblclick", function () {
    toDoContainer.removeChild(paragraph);
    toDoList.splice(toDoList.indexOf(newToDo), 1);
    //update saved to-do list in local storage
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  });
});
