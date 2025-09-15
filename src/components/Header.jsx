// src/components/Header.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { HeaderContainer, Nav } from '../styles/Header.styles';
import { Link } from 'react-scroll';

const Header = () => {
    const sections = ['projects', 'about', 'contact'];

    return (
        <HeaderContainer>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Tsion
            </Typography>
            <Nav>
                {sections.map((section) => (
                    <Link
                        key={section}
                        to={section}
                        smooth={true}
                        duration={500}
                        spy={true}
                        offset={-70}
                        activeClass="active"
                        className="nav-link"
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Link>
                ))}
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
