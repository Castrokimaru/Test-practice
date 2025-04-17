function Task(description) {
    this.description = description;
    this.isDone = false; 
  }
  
  function ToDoList() {
    this.tasks = [];
  }
  
  ToDoList.prototype.addTask = function(task) {
    this.tasks.push(task);
  };
  
  
  ToDoList.prototype.markTaskDone = function(index) {
    if (this.tasks[index]) {
      this.tasks[index].isDone = true;
    }
  };
  
  ToDoList.prototype.removeTask = function(index) {
    if (this.tasks[index]) {
      this.tasks.splice(index, 1);
    }
  };
  function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; 
    toDoList.tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
  
     
      taskItem.textContent = task.description + (task.isDone ? " (Done)" : "");
  
    
      const doneButton = document.createElement("button");
      doneButton.textContent = "Mark Done";
      doneButton.addEventListener("click", () => {
        toDoList.markTaskDone(index);
        renderTasks();
      });
  
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        toDoList.removeTask(index);
        renderTasks();
      });
  
    
      taskItem.appendChild(doneButton);
      taskItem.appendChild(removeButton);
      taskList.appendChild(taskItem);
    });
  }
  
  document.getElementById("add-task-button").addEventListener("click", () => {
    const taskInput = document.getElementById("task-input");
    const taskDescription = taskInput.value;
    if (taskDescription.trim() !== "") {
      const task = new Task(taskDescription); 
      toDoList.addTask(task); 
      renderTasks(); 
      taskInput.value = "";
    }
  });
  
  const toDoList = new ToDoList();