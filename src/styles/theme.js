// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: '#1976d2',
                dark: '#115293',
            },
            background: {
                default: mode === 'dark' ? '#121212' : '#f5f5f5',
                paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
            },
            text: {
                primary: mode === 'dark' ? '#ffffff' : '#000000',
                secondary: mode === 'dark' ? '#bbbbbb' : '#555555',
            },
            divider: mode === 'dark' ? '#333' : '#ccc',
        },
    });
