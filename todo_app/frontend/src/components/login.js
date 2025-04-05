// components/LoginForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;
  
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to tasks page
      window.location.href = '/tasks';
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleLogin}
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2 
      }}
    >
      {error && (
        <Typography 
          variant="body2" 
          color="error" 
          sx={{ mb: 1 }}
        >
          {error}
        </Typography>
      )}
      
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={onChange}
        required
        fullWidth
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
          }
        }}
      />
      
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={onChange}
        required
        fullWidth
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
          }
        }}
      />
      
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ 
          mt: 1,
          borderRadius: 3,
          py: 1.5,
        }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
}