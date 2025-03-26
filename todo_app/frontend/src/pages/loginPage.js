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
            background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
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
            onClick={handleLogin}
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
            Login
          </Button>

          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              color: '#6c757d',
              mt: 2
            }}
          >
            Don't have an account?
            <Button 
              onClick={handleSignUp}
              sx={{ 
                color: '#6a11cb', 
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Sign Up
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