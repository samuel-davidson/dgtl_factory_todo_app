import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Button, Typography, Paper } from '@mui/material';
import LoginForm from '../components/login';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
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
        
        <LoginForm />

        <Typography 
          variant="body2" 
          sx={{
            color: '#6c757d',
            mt: 2
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
      </Paper>
    </Container>
  );
}