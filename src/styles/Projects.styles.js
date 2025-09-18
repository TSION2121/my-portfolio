import styled from 'styled-components';

export const ProjectsSection = styled.section`
    padding: 4rem 2rem;
    background-color: ${({ theme }) => theme.palette.background.paper};

    /* Responsive padding for smaller screens */
    @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        padding: 2rem 1rem;
    }
`;

export const SectionTitle = styled.h2`
    font-size: 2.5rem;
    color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 2rem;
    text-align: center;
`;

export const ProjectGrid = styled.div`
    display: grid;
    /* This is already a great responsive grid! */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
`;

export const ProjectCard = styled.div`
    padding: 1.5rem;
    border: 1px solid ${({ theme }) => theme.palette.divider};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.palette.background.default};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const ProjectTitle = styled.h3`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 0.5rem;
`;

export const ProjectDescription = styled.p`
    font-size: 1.05rem;
    color: ${({ theme }) => theme.palette.text.secondary};
    line-height: 1.5;
`;