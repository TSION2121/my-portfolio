// src/components/Hero.styles.js
import styled from 'styled-components';

export const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 1rem;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;
