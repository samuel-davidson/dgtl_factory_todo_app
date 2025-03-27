// used to edit, delete and add tasks

import React, { useState } from 'react';
import { TextField, Button, Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskForm() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim()) {
      if (editingIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = newTask.trim();
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, newTask.trim()]);
      }
      setNewTask('');
    }
  };

  const handleDeleteTask = (idxToDelete) => {
    setTasks(tasks.filter((_, index) => index !== idxToDelete));
  };

  const handleEditTask = (idx) => {
    setNewTask(tasks[idx]);
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
              <ListItemText primary={task} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}