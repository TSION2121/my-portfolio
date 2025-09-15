// src/components/About.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AboutSection } from '../styles/About.styles';

const About = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AboutSection id="about">
            <Typography
                variant={isMobile ? 'h5' : 'h4'}
                component="h2"
                gutterBottom
                align="center"
            >
                About Me
            </Typography>
            <Typography
                variant={isMobile ? 'body2' : 'body1'}
                color="textPrimary"
                align="center"
            >
                I'm Tsion Bizuayehu, a senior software engineer and MSc AI candidate specializing in modular backend systems, computer vision, and reproducible research. I build scalable, reviewer-ready portfolios and advocate for responsible AI across Africa.
            </Typography>
        </AboutSection>
    );
};

export default About;
