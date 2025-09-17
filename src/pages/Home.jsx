// src/pages/Home.jsx
import React, { useMemo, useState } from 'react';
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
import db from '../../db.json';

const CATEGORIES = [
    { id: 'full-stack', label: 'Full Stack' },
    { id: 'frontend', label: 'Front End' },
    { id: 'backend', label: 'Back End' },
    { id: 'ui-ux', label: 'UI UX' },
    { id: 'ai-ml', label: 'AI Projects' },
    { id: 'space-science', label: 'Space Science' },
];

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
    const projects = db.projects;
    const research = db.research;

    const filteredProjects = useMemo(() => {
        return tab === 'all'
            ? projects
            : projects.filter((p) => p.category === tab);
    }, [tab, projects]);

    const latestProjects = useMemo(() => {
        const sortedProjects = [...projects].sort((a, b) => b.id.localeCompare(a.id));
        return sortedProjects.slice(0, 3);
    }, [projects]);

    const latestResearch = useMemo(() => {
        const sortedResearch = [...research].sort((a, b) => b.id.localeCompare(a.id));
        return sortedResearch.slice(0, 3);
    }, [research]);

    return (
        <PageWrapper>
            <Hero />

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 800 }}>
                        Latest Work
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        A showcase of recent projects and research, categorized by focus area.
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Tabs
                        value={tab}
                        onChange={(e, newTab) => setTab(newTab)}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {CATEGORIES.map((c) => (
                            <Tab key={c.id} value={c.id} label={c.label} />
                        ))}
                    </Tabs>
                </Box>

                <Grid container spacing={4}>
                    {filteredProjects.map((p) => (
                        <Grid item xs={12} sm={6} md={4} key={p.id}>
                            <DashboardCard
                                title={p.title}
                                subtitle={p.description}
                                to={`/projects/${p.id}`}
                                tech={p.techStack}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>
                        Featured Research
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {latestResearch.map((r) => (
                        <Grid item xs={12} md={4} key={r.id}>
                            <DashboardCard
                                title={r.title}
                                subtitle={r.abstract}
                                to={`/research/${r.id}`}
                                tech={r.keywords}
                                small
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>
                        Front-End Skills
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                        {SKILLS.map((s) => (
                            <Chip key={s} label={s} />
                        ))}
                    </Stack>
                </Box>

                <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" spacing={2}>
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