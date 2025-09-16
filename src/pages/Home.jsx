// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import DashboardCard from '../components/DashboardCard';
import { Container, Box, Typography, Tabs, Tab, Grid, Stack, Button } from '@mui/material';

const CATEGORIES = [
        { id: 'full-stack', label: 'Full Stack' },
        { id: 'frontend', label: 'Front End' },
        { id: 'backend', label: 'Back End' },
        { id: 'ui-ux', label: 'UI UX' },
        { id: 'ai-ml', label: 'AI Projects' },
        { id: 'space-science', label: 'Space Science' },
];

export default function Home() {
        const [data, setData] = useState({ projects: [], research: [] });
        const [loading, setLoading] = useState(true);
        const [tab, setTab] = useState('full-stack');
        const [error, setError] = useState(null);

        useEffect(() => {
                const controller = new AbortController();
                const signal = controller.signal;

                setLoading(true);
                setError(null);

                Promise.all([
                        fetch('http://localhost:4000/projects', { signal }),
                        fetch('http://localhost:4000/research', { signal }),
                ])
                    .then(async ([projRes, researchRes]) => {
                            if (!projRes.ok) throw new Error('Failed to load projects');
                            if (!researchRes.ok) throw new Error('Failed to load research');
                            const projects = await projRes.json();
                            const research = await researchRes.json();
                            return { projects, research };
                    })
                    .then(({ projects, research }) => {
                            setData({ projects: Array.isArray(projects) ? projects : projects.projects || [], research: Array.isArray(research) ? research : research.research || [] });
                            setLoading(false);
                    })
                    .catch((err) => {
                            if (err.name === 'AbortError') return;
                            console.error(err);
                            setError(err.message || 'Failed to load data');
                            setData({ projects: [], research: [] });
                            setLoading(false);
                    });

                return () => controller.abort();
        }, []);

        const featured = (data.projects || [])
            .filter((p) => {
                    const roles = (p.roles || []).map((r) => r.toLowerCase());
                    const tech = (p.techStack || []).join(' ').toLowerCase();
                    if (tab === 'full-stack') {
                            return (
                                p.category === 'full-stack' ||
                                roles.includes('full-stack') ||
                                roles.includes('frontend') ||
                                roles.includes('backend') ||
                                tech.includes('react')
                            );
                    }
                    if (tab === 'frontend') {
                            return p.category === 'frontend' || roles.includes('frontend') || tech.includes('react');
                    }
                    return p.category === tab || roles.includes(tab);
            })
            .sort((a, b) => {
                    const aMatch = a.category === tab || (a.roles || []).map((r) => r.toLowerCase()).includes(tab);
                    const bMatch = b.category === tab || (b.roles || []).map((r) => r.toLowerCase()).includes(tab);
                    return aMatch === bMatch ? 0 : aMatch ? -1 : 1;
            })
            .slice(0, 6);

        const tiles = [
                { id: 'projects', title: 'Projects', subtitle: 'All projects across domains', to: '/projects' },
                { id: 'resume', title: 'Resume', subtitle: 'CV & technical highlights', to: '/resume' },
                { id: 'research', title: 'Research', subtitle: 'Papers & abstracts', to: '/research' },
                { id: 'media', title: 'Media', subtitle: 'Interviews & podcasts', to: '/media' },
                { id: 'tools', title: 'Tools', subtitle: 'Demos & utilities', to: '/dashboard' },
                { id: 'highlights', title: 'Highlights', subtitle: 'Awards & leadership', to: '/highlights' },
        ];

        return (
            <PageWrapper>
                    <Hero />

                    <Container maxWidth="lg" sx={{ mt: 4 }}>
                            <Box>
                                    <Tabs
                                        value={tab}
                                        onChange={(e, v) => setTab(v)}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="project categories"
                                    >
                                            {CATEGORIES.map((c) => (
                                                <Tab key={c.id} value={c.id} label={c.label} />
                                            ))}
                                    </Tabs>
                            </Box>

                            <Box sx={{ mt: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                            Featured Projects
                                    </Typography>

                                    <Box sx={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                                            {loading ? (
                                                Array.from({ length: 3 }).map((_, i) => <DashboardCard key={i} loading />)
                                            ) : error ? (
                                                <Box sx={{ p: 4, gridColumn: '1/-1' }}>
                                                        <Typography color="error">Error loading data: {error}</Typography>
                                                </Box>
                                            ) : featured.length === 0 ? (
                                                <Box sx={{ p: 4, gridColumn: '1/-1', textAlign: 'center' }}>
                                                        <Typography color="text.secondary">No projects found for this category yet. Try "Full Stack" or view all projects.</Typography>
                                                </Box>
                                            ) : (
                                                (featured.length ? featured : data.projects.slice(0, 3)).map((p) => (
                                                    <DashboardCard key={p.id} title={p.title} subtitle={p.description} tech={p.techStack} to={`/projects/${p.id}`} />
                                                ))
                                            )}
                                    </Box>
                            </Box>

                            <Box sx={{ mt: 5 }}>
                                    <Grid container spacing={2}>
                                            {tiles.map((t) => (
                                                <Grid item xs={12} sm={6} md={4} key={t.id}>
                                                        <DashboardCard title={t.title} subtitle={t.subtitle} to={t.to} small />
                                                </Grid>
                                            ))}
                                    </Grid>
                            </Box>

                            <Box sx={{ mt: 5, mb: 4 }}>
                                    <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 1, boxShadow: 1 }}>
                                            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
                                                    <Box>
                                                            <Typography variant="h6">Want a front-end review?</Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                    Explore projects, read technical notes, or request a walkthrough.
                                                            </Typography>
                                                    </Box>

                                                    <Stack direction="row" spacing={2}>
                                                            <Button href="/projects" variant="contained">
                                                                    View projects
                                                            </Button>
                                                            <Button href="/contact" variant="outlined">
                                                                    Contact
                                                            </Button>
                                                    </Stack>
                                            </Stack>
                                    </Box>
                            </Box>
                    </Container>

                    <Footer />
            </PageWrapper>
        );
}
