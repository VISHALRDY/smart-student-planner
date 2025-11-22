// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://18bd1a0442_db_user:Vivek@cluster0.3iubzj3.mongodb.net/?appName=Cluster0';

mongoose
  .connect(MONGODB_URI, { dbName: 'studyplanner' })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Task Model
const taskSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    title: { type: String, required: true },
    dueDate: { type: String, required: true },
    priority: { type: String, default: 'MEDIUM' },
    status: { type: String, default: 'PENDING' },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

// API Routes

app.get('/', (req, res) => {
  res.send('Study Planner API is running 🚀 with MongoDB');
});

// Get tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Create task
app.post('/api/tasks', async (req, res) => {
  try {
    const { subject, title, dueDate, priority } = req.body;
    const newTask = new Task({ subject, title, dueDate, priority });
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Update task status
app.patch('/api/tasks/:id/status', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = 'COMPLETED';
    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
