// src/styles/SkillsBar.styles.js
import styled from 'styled-components';

export const SkillsBarSection = styled.section`
    padding: 4rem 2rem;
    background-color: ${({ theme }) => theme.palette.background.default};
`;

export const SectionTitle = styled.h2`
    font-size: 2.5rem;
    color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 2rem;
    text-align: center;
`;

export const SkillBarContainer = styled.div`
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.palette.divider};
    border-radius: 4px;
    margin-top: 8px;
    overflow: hidden;
`;

export const SkillBarFill = styled.div`
    height: 100%;
    border-radius: 4px;
    width: ${({ level }) => level}%;
    background: ${({ theme, level }) => {
        const startColor = theme.palette.primary.main;
        const endColor = theme.palette.mode === 'light' ? '#66b2ff' : '#4dabf5'; // Lighter shade for visual effect
        return `linear-gradient(to right, ${startColor} 0%, ${endColor} ${level}%)`;
    }};
    transition: width 0.8s ease-out;
`;