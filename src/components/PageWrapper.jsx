// src/components/PageWrapper.jsx
import React from 'react';
import { Box } from '@mui/material';

export default function PageWrapper({ children }) {
    return (
        <Box component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {children}
        </Box>
    );
}
