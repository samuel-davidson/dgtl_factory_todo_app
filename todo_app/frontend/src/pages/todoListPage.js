// Contains page for to-do list.  Uses TaskForm from taskForm.js
//    to handle adding, editing, and deleting user tasks. 

import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import TaskForm from '../components/taskForm';

export default function Tasks() {
  return (
    <Container maxWidth="sm">
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

        <TaskForm />
        
      </Paper>
    </Container>
  );
}