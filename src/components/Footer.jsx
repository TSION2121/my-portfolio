// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';

export default function Footer() {
    return (
        <Box component="footer" sx={{ mt: 'auto', py: 4, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg">
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} Tsion Bizuayehu
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Link href="/projects" color="inherit" underline="hover">Projects</Link>
                        <Link href="/research" color="inherit" underline="hover">Research</Link>
                        <Link href="/resume" color="inherit" underline="hover">Resume</Link>
                        <Link href="/contact" color="inherit" underline="hover">Contact</Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
