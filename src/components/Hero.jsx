// src/components/Hero.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { HeroContainer } from '../styles/Hero.styles';

const Hero = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <HeroContainer>
            <Typography
                variant={isMobile ? 'h4' : 'h2'}
                component="h1"
                gutterBottom
                align="center"
            >
                Welcome to My Portfolio
            </Typography>
            <Typography
                variant={isMobile ? 'body1' : 'subtitle1'}
                color="textSecondary"
                align="center"
            >
                Modular. Scalable. Reviewer-Ready.
            </Typography>
        </HeroContainer>
    );
};

export default Hero;
