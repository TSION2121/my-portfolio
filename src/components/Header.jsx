// src/components/Header.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { HeaderContainer, Nav } from '../styles/Header.styles';
import { Link } from 'react-scroll';

const Header = () => {
    return (
        <HeaderContainer>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Tsion
            </Typography>
            <Nav>
                {['projects', 'about', 'contact'].map((section) => (
                    <Link
                        key={section}
                        to={section}
                        smooth={true}
                        duration={500}
                        spy={true}
                        activeClass="active"
                        style={{
                            margin: '0 1rem',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Link>
                ))}
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
