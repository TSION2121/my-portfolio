// src/styles/Header.styles.js
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white;
`;

export const Logo = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

export const NavItem = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;
