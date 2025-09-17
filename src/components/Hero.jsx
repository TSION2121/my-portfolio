// src/components/Hero.jsx
import React from 'react';
import { Container, Box, Typography, Chip, Button, Avatar, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function Hero() {
    const theme = useTheme();

    return (
        <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 8 } }}>
            <Container maxWidth="lg">
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center" justifyContent="space-between">
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="overline" color="primary" sx={{ letterSpacing: 0.6, display: 'block' }}>
                            Hello, I’m
                        </Typography>

                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mt: 1 }}>
                            Tsion Bizuayehu
                        </Typography>

                        <Typography variant="h6" color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
                            Front End Engineer and MSc AI student. Reviewer-focused, accessible, and modular UI designed for reviewers and collaborators.
                        </Typography>

                        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                            <Chip label="Full Stack" color="primary" size="small" />
                            <Chip label="Front End" size="small" />
                            <Chip label="AI / ML" size="small" />
                            <Chip label="Space Science" size="small" />
                        </Stack>

                        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                            <Button component={RouterLink} to="/projects" variant="contained" size="large">View Projects</Button>
                            <Button component={RouterLink} to="/contact" variant="outlined" size="large">Contact</Button>
                        </Stack>
                    </Box>

                    <Box sx={{ width: 160, textAlign: 'center' }}>
                        <Avatar src="/avatar.jpg" alt="Tsion" sx={{ width: 140, height: 140, border: `2px solid ${theme.palette.divider}` }} />
                        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                            Addis Ababa, Ethiopia
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
