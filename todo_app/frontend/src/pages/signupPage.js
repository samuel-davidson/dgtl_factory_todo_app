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
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center', 
        minHeight: '100vh', 
        background: '#f5f7fa', 
        py: 4 
      }}
    >
      <Paper 
        elevation={6} 
        sx={{ 
          width: '100%', 
          p: 4, 
          borderRadius: 3,
          background: 'white',
          boxShadow: '0 6px 12px rgba(0,0,0,0.05)'
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 600, 
            background: '#6a11cb',
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
                '& fieldset': {
                  borderColor: '#a0a0a0',
                }
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
                '& fieldset': {
                  borderColor: '#a0a0a0',
                }
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
                '& fieldset': {
                  borderColor: '#a0a0a0',
                }
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
              background: '#6a11cb',
              py: 1.5,
              '&:hover': {
                boxShadow: '0 4px 8px rgba(106,17,203,0.3)'
              }
            }}
          >
            Sign Up
          </Button>

          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              color: '#6c757d',
              mt: 2
            }}
          >
            Already have an account? 
            <Button
              onClick={handleLogin}
              sx={{ 
                color: '#6a11cb', 
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Login
            </Button>
          </Typography>

          <Button 
            component={Link}
            to="/"
            sx={{ 
              color: '#6a11cb', 
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}