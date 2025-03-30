import 'dotenv/config';
import express from 'express';
import * as task from './taskModel.mjs';
import cors from 'cors';

const PORT = process.env.PORT || 5000;
const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization']
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// CREATE controller
app.post('/tasks', async (req, res) => {
    try {
        // Validate required fields
        if (!req.body || !req.body.task) {
            return res.status(400).json({ error: 'Task content is required' });
        }
        
        const newTask = await task.createTask(req.body.task);
        console.log(`Task created: ${newTask._id}`);
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error in POST /tasks:', error);
        res.status(500).json({ error: 'Failed to create task', message: error.message });
    }
});

// RETRIEVE controller
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await task.retrieveTasks();
        console.log(`Retrieved ${tasks.length} tasks`);
        res.json(tasks);
    } catch (error) {
        console.error('Error in GET /tasks:', error);
        res.status(500).json({ error: 'Failed to retrieve tasks', message: error.message });
    }
});

// RETRIEVE by ID controller
app.get('/tasks/:_id', async (req, res) => {
    try {
        const foundTask = await task.retrieveTaskByID(req.params._id);
        
        if (!foundTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json(foundTask);
    } catch (error) {
        console.error(`Error in GET /tasks/${req.params._id}:`, error);
        res.status(500).json({ error: 'Failed to retrieve task', message: error.message });
    }
});

// UPDATE controller
app.put('/tasks/:_id', async (req, res) => {
    try {
        // Validate required fields
        if (!req.body || !req.body.task) {
            return res.status(400).json({ error: 'Task content is required' });
        }
        
        const updatedTask = await task.updateTask(req.params._id, req.body.task);
        console.log(`Task updated: ${updatedTask._id}`);
        res.json(updatedTask);
    } catch (error) {
        console.error(`Error in PUT /tasks/${req.params._id}:`, error);
        
        // Handle 'Task not found' error specifically
        if (error.message === 'Task not found') {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.status(500).json({ error: 'Failed to update task', message: error.message });
    }
});

// DELETE Controller
app.delete('/tasks/:_id', async (req, res) => {
    try {
        const deletedCount = await task.deleteTaskById(req.params._id);
        
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        console.log(`Task deleted: ${req.params._id}`);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(`Error in DELETE /tasks/${req.params._id}:`, error);
        res.status(500).json({ error: 'Failed to delete task', message: error.message });
    }
});

// 404 handler for unknown routes
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
});