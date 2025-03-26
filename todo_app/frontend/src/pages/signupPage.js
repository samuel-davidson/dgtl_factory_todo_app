// Will contain page for sign up via username, email, and password
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

export default function SignupPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
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
          Create Account
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
            label="Email"
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
            onClick={handleSignUp}
            sx={{ 
              mt: 1,
              borderRadius: 3,
              py: 1.5,
            }}
          >
            Sign Up
          </Button>

          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              color: '#6c757d',
              mt: 0.5
            }}
          >
            Already have an account? 
            <Button
              onClick={handleLogin}
              sx={{ fontWeight: 600 }}
            >
              Login
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