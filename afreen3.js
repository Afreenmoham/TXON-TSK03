const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-form input');
const list = document.querySelector('#todo-list');
const filterAll = document.querySelector('#filter-all');
const filterActive = document.querySelector('#filter-active');
const filterCompleted = document.querySelector('#filter-completed');
const deleteCompleted = document.querySelector('#delete-completed');

let todos = [];

// Check if there are any todos in the local storage and retrieve them
if (localStorage.getItem('todos')) {
  todos = JSON.parse(localStorage.getItem('todos'));
  renderTodos();
}

// Add a new todo to the list
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText !== '') {
    todos.push({
      id: Date.now(),
      text: todoText,
      completed: false
    });
    input.value = '';
    renderTodos();
    saveTodos();
  }
});

// Render the todos to the list
function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.setAttribute('data-id', todo.id);
    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="delete-btn">Delete</button>
    `;
    if (todo.completed) {
      li.classList.add('completed');
    }
    li.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI' || e.target.tagName === 'SPAN') {
        toggleCompleted(todo.id);
      }
      if (e.target.tagName === 'BUTTON') {
        deleteTodo(todo.id);
      }
    });
    list.appendChild(li);
  });
}

// Toggle a todo's completed state
function toggleCompleted(id) {
  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  renderTodos();
  saveTodos();
}

// Delete a todo from the list
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
  saveTodos();
}

// Save the todos to the local storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Filter the todos based on the selected button
filterAll.addEventListener('click', () => {
  list.querySelectorAll('li').forEach((li) => {
    li.style.display = 'flex';
  });
});

filterActive.addEventListener('click', () => {
  list.querySelectorAll('li').forEach((li) => {
    if (!li.classList.contains('completed')) {
      li.style.display = 'flex';
    } else {
      li.style.display = 'none';
    }
  });
});

filterCompleted.addEventListener('click', () => {
  list.querySelectorAll('li').forEach((li) => {
    if (li.classList.contains('completed')) {
      li.style.display = 'flex';
    } else {
      li.style.display = 'none';
    }
  });
});

// Delete all completed todos
deleteCompleted.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
  saveTodos();
});
