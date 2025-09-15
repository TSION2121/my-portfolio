// src/pages/NotFound.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>404</Typography>
        <Typography variant="h6" gutterBottom>Page Not Found</Typography>
        <Link to="/" style={{ color: '#1976d2' }}>Go back home</Link>
    </Box>
);

export default NotFound;
