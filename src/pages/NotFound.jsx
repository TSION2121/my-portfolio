// src/pages/NotFound.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <Box
        sx={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
        }}
    >
        <Typography variant="h3" gutterBottom>
            404
        </Typography>
        <Typography variant="h6" gutterBottom>
            Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            The page you're looking for doesn’t exist or has been moved.
        </Typography>
        <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Go back home
        </Link>
    </Box>
);

export default NotFound;
