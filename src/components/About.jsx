// src/components/About.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { AboutSection } from '../styles/About.styles';

const About = () => {
    return (
        <AboutSection id="about">
            <Typography variant="h4" component="h2" gutterBottom align="center">
                About Me
            </Typography>
            <Typography variant="body1" color="textPrimary" align="center">
                I'm Tsion Bizuayehu, a senior software engineer and MSc AI candidate specializing in modular backend systems, computer vision, and reproducible research. I build scalable, reviewer-ready portfolios and advocate for responsible AI across Africa.
            </Typography>
        </AboutSection>
    );
};

export default About;
