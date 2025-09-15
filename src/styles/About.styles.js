// src/styles/About.styles.js
import styled from 'styled-components';

export const AboutSection = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 2rem;
  text-align: center;
`;

export const AboutText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.palette.text.primary};
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;
