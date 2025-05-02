// Signup
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const expenseForm = document.getElementById("expense-form");
    const logoutBtn = document.getElementById("logout-btn");
  
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;
  
        if (localStorage.getItem(username)) {
          alert("Username already exists. Try logging in.");
        } else {
          const user = { password, expenses: [] };
          localStorage.setItem(username, JSON.stringify(user));
          alert("Signup successful. Please log in.");
          window.location.href = "login.html";
        }
      });
    }
  
    // Login
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;
  
        const userData = localStorage.getItem(username);
        if (!userData) {
          alert("User not found. Sign up first.");
          return;
        }
  
        const user = JSON.parse(userData);
        if (user.password === password) {
          sessionStorage.setItem("loggedInUser", username);
          window.location.href = "dashboard.html";
        } else {
          alert("Incorrect password.");
        }
      });
    }
  
    // Dashboard
    if (expenseForm) {
      const username = sessionStorage.getItem("loggedInUser");
      if (!username) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
      }
  
      const updateSummary = () => {
        const user = JSON.parse(localStorage.getItem(username));
        const summary = {};
  
        user.expenses.forEach((expense) => {
          if (!summary[expense.category]) summary[expense.category] = 0;
          summary[expense.category] += parseFloat(expense.amount);
        });
  
        const output = document.getElementById("summary-output");
        output.innerHTML = "";
  
        for (let [category, amount] of Object.entries(summary)) {
          const div = document.createElement("div");
          div.textContent = `${category.toUpperCase()}: $${amount.toFixed(2)}`;
          output.appendChild(div);
        }
      };
  
      updateSummary();
  
      expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const name = document.getElementById("expense-name").value;
        const amount = document.getElementById("expense-amount").value;
        const category = document.getElementById("expense-category").value;
  
        const user = JSON.parse(localStorage.getItem(username));
        user.expenses.push({ name, amount, category });
        localStorage.setItem(username, JSON.stringify(user));
  
        expenseForm.reset();
        updateSummary();
      });
    }
  
    // Logout
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
      });
    }
  });
  const user = { password, expenses: [] };
localStorage.setItem(username, JSON.stringify(user));


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

