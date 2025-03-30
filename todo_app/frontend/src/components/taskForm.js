import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskForm() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim()) {
      if (editingIndex !== null) {
        // Update existing task
        try {
          const response = await fetch(`/tasks/${tasks[editingIndex]._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: newTask.trim() })
          });
          
          if (response.ok) {
            // Refresh the task list from server
            fetchTasks();
            setEditingIndex(null);
          }
        } catch (error) {
          console.error('Error updating task:', error);
        }
      } else {
        // Add new task
        try {
          const response = await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: newTask.trim() })
          });
          
          if (response.ok) {
            // Refresh the task list from server
            fetchTasks();
          }
        } catch (error) {
          console.error('Error adding task:', error);
        }
      }
      setNewTask('');
    }
  };

  const handleDeleteTask = async (idxToDelete) => {
    try {
      const response = await fetch(`/tasks/${tasks[idxToDelete]._id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Refresh the task list from server
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (idx) => {
    setNewTask(tasks[idx].task);
    setEditingIndex(idx);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          label={editingIndex !== null ? "Edit task" : "Add a new task"}
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          sx={{ 
            mr: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
        
        <Button
          variant="contained"
          onClick={handleAddTask}
          sx={{ minWidth: 120 }}
        >
          {editingIndex !== null ? "Update" : "Add Task"}
        </Button>
      </Box>

      {tasks.length === 0 ? (
        <Box 
          sx={{ 
            mt: 3, 
            p: 3, 
            bgcolor: '#f8f9fa', 
            borderRadius: 2,
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px dashed #6a11cb22'
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center',
              color: '#6c757d',
              fontStyle: 'italic'
            }}
          >
            No tasks yet. Add a new task!
          </Typography>
        </Box>
      ) : (
        <List>
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <IconButton 
                    edge="end" 
                    aria-label="edit"
                    onClick={() => handleEditTask(index)}
                    sx={{ mr: 1}}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => handleDeleteTask(index)}
                    sx={{ color: '#ff4d4d' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={task.task} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}