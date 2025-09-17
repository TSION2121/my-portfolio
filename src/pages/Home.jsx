// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import DashboardCard from '../components/DashboardCard';
import {
    Container,
    Box,
    Typography,
    Tabs,
    Tab,
    Grid,
    Stack,
    Button,
    Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import db from '../../db.json'; // Directly import the JSON data

const CATEGORIES = [
    { id: 'full-stack', label: 'Full Stack' },
    { id: 'frontend', label: 'Front End' },
    { id: 'backend', label: 'Back End' },
    { id: 'ui-ux', label: 'UI UX' },
    { id: 'ai-ml', label: 'AI Projects' },
    { id: 'space-science', label: 'Space Science' },
];

// quick front-end skill list shown on Home
const SKILLS = [
    'React',
    'Material UI',
    'Framer Motion',
    'TypeScript',
    'Responsive Design',
    'Accessibility',
    'Vite',
    'Jest',
];

export default function Home() {
    const [tab, setTab] = useState('full-stack');
    const [displayedProjects, setDisplayedProjects] = useState([]);
    const [displayedResearch, setDisplayedResearch] = useState([]);

    useEffect(() => {
        const filteredProjects = db.projects
            .filter((p) => p.category === tab)
            .slice(0, 4);
        setDisplayedProjects(filteredProjects);
        setDisplayedResearch(db.research.slice(0, 4));
    }, [tab]);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <PageWrapper>
            <Hero />

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 800 }}>
                        My Work
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        A showcase of my recent projects and research.
                    </Typography>
                </Box>

                <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }} variant="scrollable" scrollButtons="auto">
                    {CATEGORIES.map((c) => (
                        <Tab key={c.id} value={c.id} label={c.label} />
                    ))}
                </Tabs>

                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {displayedProjects.map((project) => (
                        <Grid item xs={12} sm={6} key={project.id}>
                            <DashboardCard
                                title={project.title}
                                subtitle={project.description}
                                tech={project.techStack}
                                to={`/projects/${project.id}`}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mb: 4 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                        <Box>
                            <Typography variant="h6">View all projects</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Explore a curated list of all my projects.
                            </Typography>
                        </Box>
                        <Button component={Link} to="/projects" variant="contained">
                            View All Projects
                        </Button>
                    </Stack>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 800 }}>
                        My Research
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        Publications, technical papers, and academic work.
                    </Typography>
                </Box>

                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {displayedResearch.map((item) => (
                        <Grid item xs={12} sm={6} key={item.id}>
                            <DashboardCard
                                small
                                title={item.title}
                                subtitle={item.authors.join(', ')}
                                tech={item.keywords}
                                to={`/research/${item.id}`}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ mb: 4 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                        <Box>
                            <Typography variant="h6">View all research</Typography>
                            <Typography variant="body2" color="text.secondary">
                                See a full list of all my academic work.
                            </Typography>
                        </Box>
                        <Button component={Link} to="/research" variant="contained">
                            View All Research
                        </Button>
                    </Stack>
                </Box>

                <Box sx={{ mt: 6, p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
                        <Box>
                            <Typography variant="h6">Want a front-end review?</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Explore projects, read technical notes, or request a walkthrough.
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={2}>
                            <Button component={Link} to="/projects" variant="contained">
                                View projects
                            </Button>
                            <Button component={Link} to="/contact" variant="outlined">
                                Contact
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Container>

            <Footer />
        </PageWrapper>
    );
}