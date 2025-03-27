// Contains page for sign up via username, email, and password
import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

export default function SignupPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = e => {
    e.preventDefault();
    console.log(formData);
    navigate('/tasks');
  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;
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
          Create Account
        </Typography>
        
        <Box 
          component="form"
          onSubmit={handleSignUp} 
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
            name="email"
            label="Email"
            variant="outlined"
            value={email}
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
            type="submit"
            variant="contained"
            fullWidth
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