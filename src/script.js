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

