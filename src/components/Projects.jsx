// src/components/Projects.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    ProjectsSection,
    ProjectGrid,
    ProjectCard,
} from '../styles/Projects.styles';

const Projects = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ProjectsSection id="projects">
            <Typography
                variant={isMobile ? 'h5' : 'h4'}
                component="h2"
                gutterBottom
                align="center"
            >
                Projects
            </Typography>
            <ProjectGrid>
                <ProjectCard>
                    <Typography variant="h6" component="h3">
                        Vision Tracker
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        A modular computer vision pipeline for tracking objects in simulation environments.
                    </Typography>
                </ProjectCard>
                <ProjectCard>
                    <Typography variant="h6" component="h3">
                        API Architect
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        A backend-first architecture for scalable APIs with secure endpoints and CI/CD.
                    </Typography>
                </ProjectCard>
            </ProjectGrid>
        </ProjectsSection>
    );
};

export default Projects;
