// src/components/Hero.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { HeroContainer } from '../styles/Hero.styles';

const Hero = () => {
    return (
        <HeroContainer>
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome to My Portfolio
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Modular. Scalable. Reviewer-Ready.
            </Typography>
        </HeroContainer>
    );
};

export default Hero;
