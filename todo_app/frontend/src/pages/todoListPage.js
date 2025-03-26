// Will contain page for displaying to-do list with options to 
//  create, edit, and delete tasks. 

import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, IconButton, List, ListItem, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (idx) => {
    setTasks(tasks.filter((_, index) => index !== idx));
  };


  return (
    <Container 
      maxWidth="sm"
    >
      <Paper 
        elevation={6} 
        sx={{ 
          width: '100%', 
          p: 4, 
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{  
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3
          }}
        >
          Todo List
        </Typography>
        
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            label="Add a new task"
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
            sx={{ 
              minWidth: 120,
            }}
          >
            Add Task
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
      </Paper>
    </Container>
  );
}