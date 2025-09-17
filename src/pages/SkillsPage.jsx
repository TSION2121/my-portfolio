// src/pages/SkillsPage.jsx
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { Container, Box, Typography, Grid, Paper, Stack, Chip } from '@mui/material';
import Footer from '../components/Footer';

const SKILLS = [
    { name: 'React', level: 90 },
    { name: 'Material UI', level: 85 },
    { name: 'Framer Motion', level: 75 },
    { name: 'TypeScript', level: 70 },
    { name: 'Responsive Design', level: 95 },
    { name: 'Accessibility', level: 88 },
    { name: 'Vite', level: 80 },
    { name: 'Jest', level: 65 },
];

export default function SkillsPage() {
    return (
        <PageWrapper>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
                        Skills
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        Front-end and related proficiencies focused on reviewer-friendly implementation and scalable UI.
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Paper variant="outlined" sx={{ p: 3 }}>
                            <Stack spacing={2}>
                                {SKILLS.map((s) => (
                                    <Box key={s.name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ minWidth: 120 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                {s.name}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ flex: 1 }}>
                                            <Box
                                                sx={{
                                                    height: 10,
                                                    bgcolor: 'divider',
                                                    borderRadius: 1,
                                                    overflow: 'hidden',
                                                }}
                                                aria-hidden
                                            >
                                                <Box
                                                    sx={{
                                                        width: `${s.level}%`,
                                                        height: '100%',
                                                        bgcolor: 'primary.main',
                                                    }}
                                                />
                                            </Box>
                                        </Box>

                                        <Box sx={{ minWidth: 40 }}>
                                            <Typography variant="caption">{s.level}%</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper variant="outlined" sx={{ p: 3 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                                Key Technologies
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                                {SKILLS.map((s) => (
                                    <Chip key={s.name} label={s.name} size="small" color="primary" sx={{ mb: 1 }} />
                                ))}
                            </Stack>

                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                    Notes
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    These skills are surfaced across projects, demos, and reviewer notes. Each project lists the exact role and relevant tech stack.
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </PageWrapper>
    );
}
