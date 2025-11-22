// main.js – Frontend with filters

const API_BASE = 'http://localhost:5000/api/tasks';

let allTasks = [];
let currentFilter = 'ALL';

const messageBox = document.getElementById('message');

function showMessage(text, duration = 2000) {
  messageBox.textContent = text;
  if (duration) {
    setTimeout(() => {
      if (messageBox.textContent === text) {
        messageBox.textContent = '';
      }
    }, duration);
  }
}

function renderTasks() {
  const tbody = document.getElementById('taskTableBody');
  tbody.innerHTML = '';

  let filtered = allTasks;

  if (currentFilter === 'PENDING') {
    filtered = allTasks.filter(t => t.status === 'PENDING');
  } else if (currentFilter === 'COMPLETED') {
    filtered = allTasks.filter(t => t.status === 'COMPLETED');
  } else if (currentFilter === 'HIGH') {
    filtered = allTasks.filter(t => t.priority === 'HIGH');
  }

  if (!filtered.length) {
    const tr = document.createElement('tr');
    tr.innerHTML =
      `<td colspan="6" style="text-align:center;">No tasks for this filter</td>`;
    tbody.appendChild(tr);
    return;
  }

  filtered.forEach(task => {
    const tr = document.createElement('tr');

    const priorityClass =
      task.priority === 'HIGH'
        ? 'badge-high'
        : task.priority === 'MEDIUM'
        ? 'badge-medium'
        : 'badge-low';

    const statusClass =
      task.status === 'COMPLETED' ? 'badge-completed' : 'badge-pending';

    tr.innerHTML = `
      <td>${task.subject}</td>
      <td>${task.title}</td>
      <td>${task.dueDate}</td>
      <td><span class="badge ${priorityClass}">${task.priority}</span></td>
      <td><span class="badge ${statusClass}">${task.status}</span></td>
      <td class="actions">
        <button class="btn-done"
          onclick="markCompleted('${task._id}')"
          ${task.status === 'COMPLETED' ? 'disabled' : ''}>
          ✓ Done
        </button>
        <button class="btn-delete"
          onclick="deleteTask('${task._id}')">
          🗑 Delete
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

async function loadTasks() {
  try {
    const res = await fetch(API_BASE);
    allTasks = await res.json();
    renderTasks();
  } catch (err) {
    console.error('Error loading tasks:', err);
    showMessage('Error loading tasks. Check console.', 3000);
  }
}

document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const subject = document.getElementById('subject').value.trim();
  const title = document.getElementById('title').value.trim();
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;

  if (!subject || !title || !dueDate) {
    showMessage('Please fill all fields.');
    return;
  }

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, title, dueDate, priority })
    });

    if (!res.ok) throw new Error('Failed to create task');

    showMessage('Task added ✅');
    e.target.reset();
    await loadTasks();
  } catch (err) {
    console.error('Error creating task:', err);
    showMessage('Error creating task.', 3000);
  }
});

async function markCompleted(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}/status`, {
      method: 'PATCH'
    });

    if (!res.ok) throw new Error('Failed to update task');

    showMessage('Task marked as completed ✔');
    await loadTasks();
  } catch (err) {
    console.error('Error updating task:', err);
    showMessage('Error updating task.', 3000);
  }
}

async function deleteTask(id) {
  const ok = confirm('Delete this task?');
  if (!ok) return;

  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok && res.status !== 204) {
      throw new Error('Failed to delete task');
    }

    showMessage('Task deleted 🗑');
    await loadTasks();
  } catch (err) {
    console.error('Error deleting task:', err);
    showMessage('Error deleting task.', 3000);
  }
}

// Filter button handling
function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.classList.remove('active');
  });

  if (filter === 'ALL') {
    document.getElementById('filterAll').classList.add('active');
  } else if (filter === 'PENDING') {
    document.getElementById('filterPending').classList.add('active');
  } else if (filter === 'COMPLETED') {
    document.getElementById('filterCompleted').classList.add('active');
  } else if (filter === 'HIGH') {
    document.getElementById('filterHigh').classList.add('active');
  }

  renderTasks();
}

window.addEventListener('DOMContentLoaded', () => {
  // hook up filter buttons
  document.getElementById('filterAll').addEventListener('click', () => setFilter('ALL'));
  document.getElementById('filterPending').addEventListener('click', () => setFilter('PENDING'));
  document.getElementById('filterCompleted').addEventListener('click', () => setFilter('COMPLETED'));
  document.getElementById('filterHigh').addEventListener('click', () => setFilter('HIGH'));

  loadTasks();
});
