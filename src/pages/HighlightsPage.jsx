// src/pages/HighlightsPage.jsx
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { Container, Box, Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
import Footer from '../components/Footer';

const HIGHLIGHTS = [
    { title: 'MSc AI (in progress)', detail: 'Focused on computer vision and reproducible research' },
    { title: 'Lead Frontend Engineer', detail: 'Reviewer-friendly architectures and scalable UI' },
    { title: 'Space Science Outreach', detail: 'Planetarium tools, MBSE, mission design' },
    { title: 'Community Workshops', detail: 'Built educational kits and prototyping labs' },
];

export default function HighlightsPage() {
    return (
        <PageWrapper>
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
                        Highlights
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        Selected achievements, leadership roles, and academic milestones.
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper variant="outlined" sx={{ p: 3 }}>
                            <List>
                                {HIGHLIGHTS.map((h) => (
                                    <ListItem key={h.title} divider>
                                        <ListItemText primary={h.title} secondary={h.detail} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </PageWrapper>
    );
}
