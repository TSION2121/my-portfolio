// src/components/Projects.jsx
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    ProjectsSection,
    ProjectGrid,
    ProjectCard,
} from '../styles/Projects.styles';
import { Link } from 'react-router-dom';

const Projects = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/projects')
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error('Failed to fetch projects:', err));
    }, []);

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
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        to={`/projects/${project.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <ProjectCard>
                            <Typography variant="h6" component="h3">
                                {project.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {project.description}
                            </Typography>
                        </ProjectCard>
                    </Link>
                ))}
            </ProjectGrid>
        </ProjectsSection>
    );
};

export default Projects;
