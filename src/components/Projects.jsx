import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    ProjectsSection,
    ProjectGrid,
    ProjectCard,
} from '../styles/Projects.styles';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

const Projects = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/projects')
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setError(true);
                setLoading(false);
            });
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
        hover: { scale: 1.03, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
    };

    if (loading) {
        return (
            <Box sx={{ padding: '2rem', textAlign: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: '2rem', textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                    Failed to load projects. Please try again later.
                </Typography>
            </Box>
        );
    }

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
                        key={project.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        transition={{ duration: 0.4, delay: index * 0.2 }}
                    >
                        <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                            <ProjectCard>
                                <Typography variant="h6" component="h3">
                                    {project.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {project.description}
                                </Typography>
                            </ProjectCard>
                        </Link>
                    </motion.div>
                ))}
            </ProjectGrid>
        </ProjectsSection>
    );
};

export default Projects;
