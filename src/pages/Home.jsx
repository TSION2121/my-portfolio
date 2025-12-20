import React from 'react';
import { Container, Box, Typography, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import SkillsBar from '../components/SkillsBar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

export default function Home() {
    return (
        <PageWrapper>
            <Helmet>
                <title>Tsion Bizuayehu | Portfolio</title>
                <meta name="description" content="Portfolio of Tsion Bizuayehu - Software Engineer and AI Specialist." />
            </Helmet>

            <Hero />

            <Container maxWidth="lg">
                {/* Integrated Featured Projects Section */}
                <FeaturedProjects />

                <Box sx={{ py: 6 }}>
                    <SkillsBar title="Tech Stack & Skills" />
                </Box>

                {/* Call to Action Section */}
                <Box sx={{ p: 4, mb: 8, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Interested in my work?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Feel free to reach out for collaborations or to discuss my research.
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={2}>
                            <Button component={RouterLink} to="/contact" variant="contained">
                                Get in Touch
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Container>

            <Footer />
        </PageWrapper>
    );
}