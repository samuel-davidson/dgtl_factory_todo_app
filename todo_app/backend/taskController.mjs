import 'dotenv/config';
import express from 'express';
import * as task from './taskModel.mjs';
import authRouter, { auth } from './authController.mjs';
import cors from 'cors';

const PORT = process.env.PORT;
const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// check for JWT key
if (!process.env.JWT_KEY) {
    console.log('JWT_KEY not found, using default key. Set a secure JWT_KEY in your environment variables.');
}

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Auth routes
app.use('/auth', authRouter);

// Protect all task routes with auth middleware
app.post('/tasks', auth, async (req, res) => {
    try {
        if (!req.body || !req.body.task) {
            return res.status(400).json({ error: 'Task content is required' });
        }
        
        const newTask = await task.createTask(req.body.task, req.user.id);
        console.log(`Task created: ${newTask._id} for user: ${req.user.id}`);
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error in POST /tasks:', error);
        res.status(500).json({ error: 'Failed to create task', message: error.message });
    }
});

app.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await task.retrieveTasks(req.user.id);
        console.log(`Retrieved ${tasks.length} tasks for user: ${req.user.id}`);
        res.json(tasks);
    } catch (error) {
        console.error('Error in GET /tasks:', error);
        res.status(500).json({ error: 'Failed to retrieve tasks', message: error.message });
    }
});

app.get('/tasks/:_id', auth, async (req, res) => {
    try {
        const foundTask = await task.retrieveTaskByID(req.params._id, req.user.id);
        
        if (!foundTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json(foundTask);
    } catch (error) {
        console.error(`Error in GET /tasks/${req.params._id}:`, error);
        res.status(500).json({ error: 'Failed to retrieve task', message: error.message });
    }
});

app.put('/tasks/:_id', auth, async (req, res) => {
    try {
        if (!req.body || !req.body.task) {
            return res.status(400).json({ error: 'Task content is required' });
        }
        
        const updatedTask = await task.updateTask(req.params._id, req.body.task, req.user.id);
        console.log(`Task updated: ${updatedTask._id} for user: ${req.user.id}`);
        res.json(updatedTask);
    } catch (error) {
        console.error(`Error in PUT /tasks/${req.params._id}:`, error);
        
        if (error.message === 'Task not found') {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.status(500).json({ error: 'Failed to update task', message: error.message });
    }
});

app.delete('/tasks/:_id', auth, async (req, res) => {
    try {
        const deletedCount = await task.deleteTaskById(req.params._id, req.user.id);
        
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        console.log(`Task deleted: ${req.params._id} for user: ${req.user.id}`);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(`Error in DELETE /tasks/${req.params._id}:`, error);
        res.status(500).json({ error: 'Failed to delete task', message: error.message });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Task API available at http://localhost:${PORT}/tasks`);
    console.log(`Auth API available at http://localhost:${PORT}/auth`);
});