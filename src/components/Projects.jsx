// src/components/Projects.jsx
import React from 'react';
import {
    ProjectsSection,
    SectionTitle,
    ProjectGrid,
    ProjectCard,
    ProjectTitle,
    ProjectDescription,
} from '../styles/Projects.styles';

const Projects = () => {
    return (
        <ProjectsSection id="projects">
            <SectionTitle>Projects</SectionTitle>
            <ProjectGrid>
                <ProjectCard>
                    <ProjectTitle>Vision Tracker</ProjectTitle>
                    <ProjectDescription>
                        A modular computer vision pipeline for tracking objects in simulation environments.
                    </ProjectDescription>
                </ProjectCard>
                <ProjectCard>
                    <ProjectTitle>API Architect</ProjectTitle>
                    <ProjectDescription>
                        A backend-first architecture for scalable APIs with secure endpoints and CI/CD.
                    </ProjectDescription>
                </ProjectCard>
            </ProjectGrid>
        </ProjectsSection>
    );
};

export default Projects;
