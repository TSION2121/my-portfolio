// src/pages/Home.jsx
import React, { useMemo } from 'react';
import { Container, Box, Typography, Stack, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import DashboardCard from '../components/DashboardCard';
import SkillsBar from '../components/SkillsBar';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import db from '../../db.json';

export default function Home() {
    // Select top 3 projects to feature on the home page
    const featuredProjects = useMemo(() => db.projects.slice(0, 3), []);

    return (
        <PageWrapper>
            <Helmet>
                <title>Tsion Bizuayehu | AI & Software Engineer</title>
            </Helmet>

            <Hero />

            {/* Featured Projects Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>
                            Featured Projects
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Highlights of my recent technical work.
                        </Typography>
                    </Box>
                    <Button component={RouterLink} to="/projects" variant="text" color="primary">
                        View All Projects →
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {featuredProjects.map((project) => (
                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                            <DashboardCard
                                title={project.title}
                                subtitle={project.description}
                                tech={project.techStack}
                                to={`/projects/${project.id}`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Skills / Tech Stack Section */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <SkillsBar title="Tech Stack & Expertise" />
            </Container>

            {/* Final Call to Action */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    sx={{
                        p: { xs: 4, md: 6 },
                        bgcolor: 'background.paper',
                        borderRadius: 4,
                        textAlign: 'center',
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Interested in a collaboration?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                        I'm currently open to new opportunities in AI development and Full-stack engineering.
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button component={RouterLink} to="/contact" variant="contained" size="large">
                            Get In Touch
                        </Button>
                        <Button component={RouterLink} to="/resume" variant="outlined" size="large">
                            View Resume
                        </Button>
                    </Stack>
                </Box>
            </Container>

            <Footer />
        </PageWrapper>
    );
}