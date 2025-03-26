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
                        mb: 3
                    }}
                >
                    To-Do List App
                </Typography>

                <img 
                    src="./android-chrome-192x192.png" 
                    alt="Davidson Designs Logo" 
                    style={{ 
                        maxWidth: '150px', 
                        marginBottom: '20px' 
                    }}
                />

                <Typography variant="body1">
                    This is the start of my To-Do List App.
                </Typography>

                <Typography variant="body1">
                    The application allows users to sign up, log in, create, read,
                    update, and delete tasks.
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