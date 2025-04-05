import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskForm() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('');

  // authentication check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  // Load tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return;
        }
        
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Could not load tasks. Please try again.');
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    if (newTask.trim()) {
      if (editingIndex !== null) {
        // Update existing task
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = {
          ...updatedTasks[editingIndex],
          task: newTask.trim()
        };
        setTasks(updatedTasks);
        
        // Call API to update in database
        const token = localStorage.getItem('token');
        fetch(`/tasks/${tasks[editingIndex]._id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ task: newTask.trim() })
        }).catch(error => {
          console.error('Error updating task:', error);
          setError('Could not update task. Please try again.');
        });
        
        setEditingIndex(null);
      } else {
        // Add new task locally first
        const tempTask = {
          _id: Date.now().toString(), // Temporary ID
          task: newTask.trim()
        };
        setTasks([...tasks, tempTask]);
        
        // Call API to add to database
        const token = localStorage.getItem('token');
        fetch('/tasks', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ task: newTask.trim() })
        })
        .then(response => response.json())
        .then(data => {
          // Replace temp task with real one from server
          setTasks(prevTasks => 
            prevTasks.map(t => 
              t._id === tempTask._id ? data : t
            )
          );
        })
        .catch(error => {
          console.error('Error adding task:', error);
          setError('Could not add task. Please try again.');
          // Remove the optimistic task on error
          setTasks(prevTasks => prevTasks.filter(t => t._id !== tempTask._id));
        });
      }
      setNewTask('');
    }
  };

  const handleDeleteTask = (idxToDelete) => {
    // Delete locally first (optimistic UI)
    const taskToDelete = tasks[idxToDelete];
    setTasks(tasks.filter((_, index) => index !== idxToDelete));
    
    // Call API to delete from database
    const token = localStorage.getItem('token');
    fetch(`/tasks/${taskToDelete._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).catch(error => {
      console.error('Error deleting task:', error);
      setError('Could not delete task. Please try again.');
      // Restore the task on error
      setTasks(prevTasks => {
        const newTasks = [...prevTasks];
        newTasks.splice(idxToDelete, 0, taskToDelete);
        return newTasks;
      });
    });
  };

  const handleEditTask = (idx) => {
    setNewTask(tasks[idx].task);
    setEditingIndex(idx);
  };


  return (
    <Box>
      {error && (
        <Typography 
          variant="body2" 
          color="error" 
          sx={{ mb: 2 }}
        >
          {error}
        </Typography>
      )}
      
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
            border: '1px'
          }}
          >
            <Typography 
              variant="body2" 
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