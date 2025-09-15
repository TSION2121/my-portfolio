// src/styles/Header.styles.js
import styled from 'styled-components';


export const HeaderContainer = styled.header`
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: ${({ theme }) => theme.palette.background.paper};
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
