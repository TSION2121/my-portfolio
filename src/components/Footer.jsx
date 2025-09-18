import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
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
                        {/* Switched to RouterLink from react-router-dom for proper internal navigation */}
                        <RouterLink to="/projects" style={{ textDecoration: 'none' }}>
                            <MuiLink color="inherit" underline="hover">Projects</MuiLink>
                        </RouterLink>
                        <RouterLink to="/research" style={{ textDecoration: 'none' }}>
                            <MuiLink color="inherit" underline="hover">Research</MuiLink>
                        </RouterLink>
                        <RouterLink to="/resume" style={{ textDecoration: 'none' }}>
                            <MuiLink color="inherit" underline="hover">Resume</MuiLink>
                        </RouterLink>
                        <RouterLink to="/contact" style={{ textDecoration: 'none' }}>
                            <MuiLink color="inherit" underline="hover">Contact</MuiLink>
                        </RouterLink>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
