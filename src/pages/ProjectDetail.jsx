// src/pages/ProjectDetail.jsx
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import PageWrapper from '../components/PageWrapper';
import { Container } from '@mui/material';
import db from '../../db.json'; // Directly import the JSON data

const ProjectDetail = () => {
    const { id } = useParams();

    // Find the project item directly from the imported JSON
    const project = useMemo(() => {
        return db.projects.find(p => p.id === id);
    }, [id]);

    if (!project) {
        return (
            <PageWrapper>
                <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>Project Not Found</Typography>
                    <Typography variant="body1" color="text.secondary">
                        The project you're looking for doesn't exist.
                    </Typography>
                    <Button component={Link} to="/projects" variant="contained" sx={{ mt: 2 }}>
                        Back to all Projects
                    </Button>
                </Container>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>{project.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, mb: 2 }}>{project.description}</Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
                    {(project.techStack || []).map((t, index) => (
                        <Chip key={index} label={t} />
                    ))}
                </Stack>

                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 3 }}>
                    {project.details}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    {project.demo && (
                        <Button href={project.demo} target="_blank" rel="noopener noreferrer" variant="contained">
                            View Demo
                        </Button>
                    )}
                    {project.github && (
                        <Button href={project.github} target="_blank" rel="noopener noreferrer" variant="outlined">
                            GitHub Repository
                        </Button>
                    )}
                </Stack>
                <Divider />

                <Box sx={{ mt: 4, pt: 2 }}>
                    <Button component={Link} to="/projects" variant="text">
                        ← Back to all Projects
                    </Button>
                </Box>
            </Container>
        </PageWrapper>
    );
};

export default ProjectDetail;