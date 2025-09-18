import React from 'react';
import { Box, Container, Typography, Stack, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
    return (
        <Box component="footer" sx={{ mt: 'auto', py: 4, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg">
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} Tsion Bizuayehu
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        {/* Use the Material UI Link component with the component prop to handle routing correctly */}
                        <Link component={RouterLink} to="/projects" color="inherit" underline="hover">Projects</Link>
                        <Link component={RouterLink} to="/research" color="inherit" underline="hover">Research</Link>
                        <Link component={RouterLink} to="/resume" color="inherit" underline="hover">Resume</Link>
                        <Link component={RouterLink} to="/contact" color="inherit" underline="hover">Contact</Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
