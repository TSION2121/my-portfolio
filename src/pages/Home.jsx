import React, { useMemo } from 'react';
import { Container, Box, Typography, Stack, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import DashboardCard from '../components/DashboardCard';
import SkillsBar from '../components/SkillsBar';
import FeaturedProjects from '../components/FeaturedProjects';
import { Helmet } from 'react-helmet-async';
import db from '../../db.json';

// Define the component
function Home() {
    const allSkills = useMemo(() => {
        const skillsSet = new Set();
        db.projects.forEach(project => {
            (project.techStack || []).forEach(skill => skillsSet.add(skill));
        });
        return Array.from(skillsSet).map(name => ({ name, level: 90 }));
    }, []);

    return (
        <PageWrapper>
            <Helmet>
                <title>Tsion Bizuayehu — Home</title>
            </Helmet>

            <Hero />

            <Container maxWidth="lg">
                <FeaturedProjects />
            </Container>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <SkillsBar title="Tech Stack & Skills" allSkills={allSkills} />
            </Container>

            <Footer />
        </PageWrapper>
    );
}

// THIS IS THE LINE THAT WAS LIKELY MISSING:
export default Home;