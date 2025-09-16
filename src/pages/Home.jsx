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

        useEffect(() => {
                fetch('/data/db.json')
                    .then((r) => r.ok ? r.json() : Promise.reject())
                    .then((json) => {
                            setData({ projects: json.projects || [], research: json.research || [] });
                            setLoading(false);
                    })
                    .catch(() => {
                            setData({ projects: [], research: [] });
                            setLoading(false);
                    });
        }, []);

        const featured = (data.projects || []).filter((p) => {
                const roles = (p.roles || []).map(r => r.toLowerCase());
                const tech = (p.techStack || []).join(' ').toLowerCase();
                if (tab === 'full-stack') return p.category === 'full-stack' || roles.includes('frontend') || roles.includes('backend') || tech.includes('react');
                if (tab === 'frontend') return p.category === 'frontend' || roles.includes('frontend') || tech.includes('react');
                return p.category === tab || roles.includes(tab);
        }).slice(0, 6);

        const tiles = [
                { id: 'projects', title: 'Projects', subtitle: 'All projects across domains', to: '/projects' },
                { id: 'resume', title: 'Resume', subtitle: 'CV & technical highlights', to: '/about' },
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
                                            {CATEGORIES.map(c => <Tab key={c.id} value={c.id} label={c.label} />)}
                                    </Tabs>
                            </Box>

                            <Box sx={{ mt: 3 }}>
                                    <Typography variant="h6" gutterBottom>Featured Projects</Typography>

                                    <Box sx={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                                            {loading
                                                ? Array.from({ length: 4 }).map((_, i) => <DashboardCard key={i} loading />)
                                                : (featured.length ? featured : data.projects.slice(0, 4)).map(p => (
                                                    <DashboardCard key={p.id} title={p.title} subtitle={p.description} tech={p.techStack} to={`/projects/${p.id}`} />
                                                ))
                                            }
                                    </Box>
                            </Box>

                            <Box sx={{ mt: 5 }}>
                                    <Grid container spacing={2}>
                                            {tiles.map(t => (
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
                                                            <Typography variant="body2" color="text.secondary">Explore projects, read technical notes, or request a walkthrough.</Typography>
                                                    </Box>

                                                    <Stack direction="row" spacing={2}>
                                                            <Button href="/projects" variant="contained">View projects</Button>
                                                            <Button href="/contact" variant="outlined">Contact</Button>
                                                    </Stack>
                                            </Stack>
                                    </Box>
                            </Box>
                    </Container>

                    <Footer />
            </PageWrapper>
        );
}
