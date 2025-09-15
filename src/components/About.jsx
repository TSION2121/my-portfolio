// src/components/About.jsx
import React from 'react';
import { AboutSection, SectionTitle, AboutText } from '../styles/About.styles';

const About = () => {
    return (
        <AboutSection id="about">
            <SectionTitle>About Me</SectionTitle>
            <AboutText>
                I'm Tsion Bizuayehu, a senior software engineer and MSc AI candidate specializing in modular backend systems, computer vision, and reproducible research. I build scalable, reviewer-ready portfolios and advocate for responsible AI across Africa.
            </AboutText>
        </AboutSection>
    );
};

export default About;
