// src/styles/Footer.styles.js
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white;
  text-align: center;
`;

export const FooterText = styled.p`
  font-size: 0.95rem;
  margin: 0;
`;
