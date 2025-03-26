import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6a11cb',
      light: '#2575fc',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff'
    },
    text: {
      primary: '#333333',
      secondary: '#6c757d'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
      background: '#6a11cb',
      textAlign: 'center',
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#a0a0a0'
            },
            '&:hover fieldset': {
              borderColor: '#6a11cb'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2575fc'
            }
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(106,17,203,0.3)'
          }
        },
        containedPrimary: {
          backgroundImage: '#6a11cb',
        },
        outlinedPrimary: {
          borderColor: '#6a11cb',
          color: '#6a11cb',
          '&:hover': {
            borderColor: '#2575fc',
            color: '#2575fc'
            } 
        },
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
            background: '#f5f7fa',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: '#f8f9fa',
          borderRadius: 8,
          border: '1px dashed #6a11cb22'
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(106, 17, 203, 0.05)'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(106, 17, 203, 0.1)',
          }
        }
      }
    }
  }
});

export default function ThemeWrapper({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}