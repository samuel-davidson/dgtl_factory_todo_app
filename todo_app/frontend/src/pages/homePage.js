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
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center', 
                minHeight: '100vh', 
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)', 
                py: 4,
                textAlign: 'center'
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
                        fontWeight: 600, 
                        background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
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
                            background: '#6a11cb',
                            '&:hover': {
                                boxShadow: '0 4px 8px rgba(106,17,203,0.3)'
                            }
                        }}
                    >Login</Button>
                    <Button
                        onClick={handleSignUp}
                        variant="outlined"
                        sx={{ 
                            borderRadius: 2,
                            borderColor: '#6a11cb',
                            color: '#6a11cb',
                            '&:hover': {
                                borderColor: '#2575fc',
                                color: '#2575fc'
                            }
                        }}
                    >Sign Up</Button>
                </Box>
            </Paper>
        </Container>
    );
}