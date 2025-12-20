// src/components/FeaturedProjects.jsx
import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DashboardCard from './DashboardCard';
import db from '../../db.json';

const FeaturedProjects = () => {
    // Selecting the specific high-impact projects you mentioned
    const featuredIds = ['knowledge-base', 'star-platform'];
    const featuredProjects = db.projects.filter(p => featuredIds.includes(p.id));

    return (
        <Box sx={{ py: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        Featured Projects
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        A selection of my most impactful work in backend and full-stack development.
                    </Typography>
                </Box>
                <Button
                    component={RouterLink}
                    to="/projects"
                    variant="text"
                    sx={{ fontWeight: 700, textTransform: 'none' }}
                >
                    View All Projects →
                </Button>
            </Box>

            <Grid container spacing={3}>
                {featuredProjects.map((project) => (
                    <Grid item xs={12} md={6} key={project.id}>
                        <DashboardCard
                            title={project.title}
                            subtitle={project.description}
                            tech={project.techStack}
                            to={`/projects/${project.id}`}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FeaturedProjects;