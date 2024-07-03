// Select DOM elements
const taskInput = document.getElementById("task-input");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-items");
const clearAll = document.querySelector(".clear-tasks");
const searchInput = document.querySelector("#search");

// Add task button click event listener
addBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Get the trimmed value from the task input field
  const taskText = taskInput.value.trim();

  // Check if the input is not empty
  if (taskText !== "") {
    // Create a new list item (li) element
    const newLi = document.createElement("li");
    newLi.className = "task";
    newLi.style.margin = ".5rem 0rem"; // Add margin for spacing

    // Create a disabled input field to display the task text
    const task = document.createElement("input");
    task.disabled = true;
    task.type = "text";
    task.className = "taskDisabled";
    task.value = taskText;

    // Create a "Delete" button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "Delete";

    // Create an "Edit" button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerText = "Edit";

    // Append the task content and buttons to the list item
    newLi.appendChild(task);
    newLi.appendChild(deleteBtn);
    newLi.appendChild(editBtn);

    // Add the list item to the task list
    taskList.appendChild(newLi);

    // Clear the task input field
    taskInput.value = "";
  } else {
    // Show an error message if the input is empty
    const err = document.querySelector(".err");
    err.style.display = "block"; // Show the error message

    // Hide the error message after 2 seconds
    setTimeout(() => {
      err.style.display = "none";
    }, 2000);
  }
});

// Task list click event listener (handles delete and edit)
taskList.addEventListener("click", (e) => {
  // Check if the clicked element is a "Delete" button
  if (e.target.classList.contains("delete-btn")) {
    // Remove the parent list item (task)
    e.target.parentElement.remove();
  } else if (e.target.classList.contains("edit-btn")) { // Check if clicked element is "Edit" button
    // Get the task input element within the clicked list item
    const input = e.target.parentElement.querySelector('input[type="text"]');

    // Toggle the disabled attribute of the task input to enable editing
    input.disabled = !input.disabled;

    // Set focus to the input field if it's enabled for editing
    if (!input.disabled) {
      input.focus();
    }
  }
});

// Clear all tasks button click event listener
clearAll.addEventListener("click", function (e) {
  e.preventDefault();
  taskList.innerHTML = ""; // Clear all child elements from the task list
});

// Search input keyup event listener (for live search)
searchInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  const searchedWord = e.target.value.toLowerCase(); // Get the search term in lowercase

  // Get all task list items
  const taskItems = document.querySelectorAll(".task");

  // Loop through each task item
  taskItems.forEach((taskItem) => {
    const taskText = taskItem.querySelector(".taskDisabled").value.toLowerCase(); // Get task text in lowercase

    // Check if the task text includes the search term
    if (taskText.indexOf(searchedWord) !== -1) {
      taskItem.style.display = "block"; // Show the task item if it matches the search
    } else {
      taskItem.style.display = "none"; // Hide the task item if it doesn't match
    }
  });
});
