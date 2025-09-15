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
import { motion } from 'framer-motion';

const Projects = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
        hover: { scale: 1.03, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
    };

    const projects = [
        {
            title: 'Vision Tracker',
            description:
                'A modular computer vision pipeline for tracking objects in simulation environments.',
        },
        {
            title: 'API Architect',
            description:
                'A backend-first architecture for scalable APIs with secure endpoints and CI/CD.',
        },
    ];

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
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        transition={{ duration: 0.4, delay: index * 0.2 }}
                    >
                        <ProjectCard>
                            <Typography variant="h6" component="h3">
                                {project.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {project.description}
                            </Typography>
                        </ProjectCard>
                    </motion.div>
                ))}
            </ProjectGrid>
        </ProjectsSection>
    );
};

export default Projects;
