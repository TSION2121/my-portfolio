// src/pages/ProjectDetail.jsx
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Footer from '../components/Footer';
import db from '../../db.json';
import {
    Container,
    Box,
    Typography,
    Chip,
    Stack,
    Button,
    Grid,
    Paper,
} from '@mui/material';
import { motion } from 'framer-motion';

const ProjectDetail = () => {
    const { id } = useParams();
    const projects = db.projects;

    // Use useMemo to find the project to avoid re-calculating on every render
    const project = useMemo(() => {
        return projects.find((p) => p.id === id);
    }, [id, projects]);

    if (!project) {
        return (
            <PageWrapper>
                <Container maxWidth="md" sx={{ py: 6 }}>
                    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
                        <Typography variant="h4">Project Not Found</Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            The project you are looking for does not exist.
                        </Typography>
                        <Button component={Link} to="/projects" variant="contained" sx={{ mt: 3 }}>
                            Back to Projects
                        </Button>
                    </Box>
                </Container>
                <Footer />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h3" component="h1" sx={{ fontWeight: 800 }}>
                                {project.title}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                                {project.description}
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
                                    Project Details
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    {project.details}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper variant="outlined" sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                    Metadata
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                                    {(project.techStack || []).map((tech) => (
                                        <Chip key={tech} label={tech} size="small" variant="outlined" />
                                    ))}
                                </Stack>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Category: {project.category}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Roles: {project.roles.join(', ')}
                                </Typography>
                                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                    {project.github && (
                                        <Button
                                            component="a"
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="outlined"
                                        >
                                            GitHub
                                        </Button>
                                    )}
                                    {project.demo && (
                                        <Button
                                            component="a"
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="contained"
                                        >
                                            Live Demo
                                        </Button>
                                    )}
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>
            <Footer />
        </PageWrapper>
    );
};

export default ProjectDetail;