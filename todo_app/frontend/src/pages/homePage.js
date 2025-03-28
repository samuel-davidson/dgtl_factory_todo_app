import '../App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Typography, Button, Box, Paper } from '@mui/material';


export default function Home() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogin = () => {
        navigate('/login');
    };
    return(
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
                        mb: 1
                    }}
                >
                    To-Do List Application
                </Typography>

                <Typography variant="h6">
                    2025 Samuel Davidson
                </Typography>

                <Typography variant="body1">
                    This application allows users to register an 
                    accout and login to the created account.  Once logged in,
                    the user can view their to-do list, add a new task, and edit
                    or delete an existing task.
                </Typography>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: 2, 
                        mt: 3 
                    }}
                >
                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        sx={{ 
                            borderRadius: 2,
                        }}
                    >Login</Button>
                    <Button
                        onClick={handleSignUp}
                        variant="outlined"
                        sx={{ 
                            borderRadius: 2,
                        }}
                    >Sign Up</Button>
                </Box>
            </Paper>
        </Container>
    );
}