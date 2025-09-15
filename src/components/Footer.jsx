// src/components/Footer.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { FooterContainer } from '../styles/Footer.styles';

const Footer = () => {
    return (
        <FooterContainer>
            <Typography variant="body2" align="center">
                © {new Date().getFullYear()} Tsion Bizuayehu. All rights reserved.
            </Typography>
        </FooterContainer>
    );
};

export default Footer;
