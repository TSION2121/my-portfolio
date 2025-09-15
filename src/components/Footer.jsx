// src/components/Footer.jsx
import React from 'react';
import { FooterContainer, FooterText } from '../styles/Footer.styles';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterText>© {new Date().getFullYear()} Tsion Bizuayehu. All rights reserved.</FooterText>
        </FooterContainer>
    );
};

export default Footer;
