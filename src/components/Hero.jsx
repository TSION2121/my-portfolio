// src/components/Hero.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { HeroContainer } from '../styles/Hero.styles';
import { motion } from 'framer-motion';

const Hero = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <HeroContainer>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
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
            </motion.div>
        </HeroContainer>
    );
};

export default Hero;
