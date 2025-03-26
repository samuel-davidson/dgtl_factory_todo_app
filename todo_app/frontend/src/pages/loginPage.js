// Will contain page for existing user login
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/tasks');
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
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              }
            }}
          />
          
          <TextField
            label="Password"
            type="password"
            variant="outlined"
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