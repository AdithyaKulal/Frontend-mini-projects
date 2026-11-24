document.addEventListener('DOMContentLoaded', () => {

  let todoInput = document.getElementById("todo-input");
  let todoList = document.getElementById("todo-list");
  let taskButton = document.getElementById("add-task-btn");


  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
   tasks.forEach((task) =>  renderTask(task));

  taskButton.addEventListener("click", function (event) {
    event.preventDefault();

    let inputText = todoInput.value.trim();

    if (inputText === "") return;

    let newTask = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };

    tasks.push(newTask);
      saveTasks(); // saves the tasks in the localStorage
      renderTask(newTask); 
    todoInput.value = ""; // clear the input after storing

    console.log(tasks);
  });

  // push the tasks array into localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  //Pick the tasks from the localStorage and pass to DOM
  function renderTask(task) {
      let newItem = document.createElement("li");
      newItem.setAttribute("data-id", task.id);
      if (task.completed) newItem.classList.add("completed");
      newItem.innerHTML = `
      <span>${task.text}</span>
      <button>delete</button>
      `;
      
      newItem.addEventListener('click', (event) => {
          if (event.target.tagName === 'BUTTON') return;
          task.completed = !task.completed;
          newItem.classList.toggle("completed");
          saveTasks();
      });
      
      newItem.querySelector('button').addEventListener('click', (event) => {
          event.stopPropagation();
          tasks = tasks.filter(t => t.id !== task.id);
          newItem.remove();
          saveTasks();

      })
      
      todoList.appendChild(newItem);

  }

  
})