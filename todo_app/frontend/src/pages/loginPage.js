// Will contain page for existing user login
import React, { useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = e => {
    e.preventDefault();
    console.log(formData);
    navigate('/tasks');
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });
  

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
          Login
        </Typography>
        
        <Box 
          component="form" 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2 
          }}
        >
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange ={onChange} required
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
            onChange ={onChange} required
            fullWidth
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              }
            }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{ 
              mt: 1,
              borderRadius: 3,
              py: 1.5,
            }}
          >
            Login
          </Button>

          <Typography 
            variant="body2" 
            sx={{
              color: '#6c757d',
              mt: 0.5
            }}
          >
            Don't have an account?
            <Button 
              onClick={handleSignUp}
              sx={{ fontWeight: 600 }}
            >
              Sign Up
            </Button>
          </Typography>

          <Button 
            component={Link}
            to="/"
            sx={{ fontWeight: 600 }}
          >
            Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}