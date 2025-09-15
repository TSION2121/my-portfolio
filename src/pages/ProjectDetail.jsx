// src/pages/ProjectDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress } from '@mui/material';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:4000/projects/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProject(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ padding: '2rem', textAlign: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!project || !project.id) {
        return (
            <Box sx={{ padding: '2rem', textAlign: 'center' }}>
                <Typography variant="h4">Project Not Found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: '2rem' }}>
            <Typography variant="h3" gutterBottom>{project.title}</Typography>
            <Typography variant="body1" gutterBottom>{project.description}</Typography>
            <Typography variant="body2" color="textSecondary">{project.details}</Typography>
        </Box>
    );
};

export default ProjectDetail;
