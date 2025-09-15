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

export const Nav = styled.nav`
    display: flex;
    gap: 1.5rem;

    .nav-link {
        cursor: pointer;
        text-decoration: none;
        color: ${({ theme }) => theme.palette.text.primary};
        font-weight: 500;
        transition: all 0.3s ease;

        &.active {
            font-weight: bold;
            border-bottom: 2px solid ${({ theme }) => theme.palette.primary.main};
        }

        &:hover {
            color: ${({ theme }) => theme.palette.primary.main};
        }
    }
`;
