// src/components/Header.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { HeaderContainer, Logo, Nav, NavItem } from '../styles/Header.styles';

const Header = () => {
    return (
        <HeaderContainer>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Tsion
            </Typography>
            <Nav>
                <NavItem href="#projects">Projects</NavItem>
                <NavItem href="#about">About</NavItem>
                <NavItem href="#contact">Contact</NavItem>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
