// src/components/Hero.jsx
import React from 'react';
import { HeroContainer, HeroTitle, HeroSubtitle } from './Hero.styles';

const Hero = () => {
    return (
        <HeroContainer>
            <HeroTitle>Welcome to My Portfolio</HeroTitle>
            <HeroSubtitle>Modular. Scalable. Reviewer-Ready.</HeroSubtitle>
        </HeroContainer>
    );
};

export default Hero;
