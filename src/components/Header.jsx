// src/components/Header.jsx
import React from 'react';
import { HeaderContainer, Logo, Nav, NavItem } from '../styles/Header.styles';

const Header = () => {
    return (
        <HeaderContainer>
            <Logo>Tsion</Logo>
            <Nav>
                <NavItem href="#projects">Projects</NavItem>
                <NavItem href="#about">About</NavItem>
                <NavItem href="#contact">Contact</NavItem>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
