// src/components/Footer.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FooterContainer } from '../styles/Footer.styles';

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <FooterContainer>
            <Typography
                variant={isMobile ? 'body2' : 'body1'}
                align="center"
            >
                © {new Date().getFullYear()} Tsion Bizuayehu. All rights reserved.
            </Typography>
        </FooterContainer>
    );
};

export default Footer;
