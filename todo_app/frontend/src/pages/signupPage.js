// Contains page for sign up via username, email, and password
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Button, Typography, Paper } from '@mui/material';
import SignupForm from '../components/signup';

export default function SignupPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
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
        
        <SignupForm />
        
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
      </Paper>
    </Container>
  );
}