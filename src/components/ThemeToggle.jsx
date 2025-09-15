// src/components/ThemeToggle.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeToggle = ({ mode, setMode }) => {
    const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');

    return (
        <IconButton
            onClick={toggleMode}
            sx={{ position: 'fixed', top: 16, right: 16 }}
            color="inherit"
        >
            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
    );
};

export default ThemeToggle;
