// src/components/Projects.jsx
import React, { useMemo, useState } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Chip,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Skeleton,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import db from '../../db.json'; // Directly import the JSON data
import {
    ProjectsSection,
    ProjectGrid,
    ProjectCard,
} from '../styles/Projects.styles';

// --- Helper sets for semantic matching (editable) ---
const backendTechs = new Set([
    'node.js', 'node', 'express', 'spring boot', 'spring', 'java', 'python',
    'django', 'flask', 'go', 'golang', 'postgresql', 'postgres', 'mysql',
    'mongodb', 'redis', 'graphql', 'grpc', 'kafka', 'rabbitmq', 'docker',
    'kubernetes', 'k8s'
]);

const frontendTechs = new Set([
    'react', 'vue', 'angular', 'svelte', 'next.js', 'next', 'gatsby',
    'material ui', 'mui', 'tailwind', 'css', 'scss', 'styled-components',
    'framer motion', 'html', 'typescript', 'javascript', 'ts', 'js'
]);

const aiMlTechs = new Set([
    'ai', 'ml', 'tensorflow', 'pytorch', 'scikit-learn', 'nlp',
    'computer vision', 'cv', 'neural networks', 'deep learning',
    'machine learning', 'data science', 'keras', 'hugging face'
]);

// Map keywords to categories
const getCategoryByTech = (techStack) => {
    const stack = techStack.map(t => t.toLowerCase());
    if (stack.some(t => aiMlTechs.has(t))) return 'ai-ml';
    if (stack.some(t => backendTechs.has(t))) return 'backend';
    if (stack.some(t => frontendTechs.has(t))) return 'frontend';
    return null;
};

// --- Framer Motion variants for animations ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const PROJECTS_PER_PAGE = 6;
const ALL_PROJECTS = db.projects;

const Projects = () => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('newest'); // Added sort state

    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) {
            setFilter(newFilter);
            setCurrentPage(1); // Reset to first page on filter change
        }
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
        setCurrentPage(1);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const filteredAndSortedProjects = useMemo(() => {
        let projects = [...ALL_PROJECTS];

        // Apply search filter
        if (search) {
            projects = projects.filter(
                (p) =>
                    p.title.toLowerCase().includes(search.toLowerCase()) ||
                    p.description.toLowerCase().includes(search.toLowerCase()) ||
                    p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
            );
        }

        // Apply category filter
        if (filter !== 'all') {
            projects = projects.filter((p) => p.category === filter);
        }

        // Apply sorting
        switch (sort) {
            case 'newest':
                projects.sort((a, b) => b.id.localeCompare(a.id));
                break;
            case 'oldest':
                projects.sort((a, b) => a.id.localeCompare(b.id));
                break;
            case 'a-z':
                projects.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'z-a':
                projects.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        return projects;
    }, [search, filter, sort]);

    const totalPages = Math.ceil(filteredAndSortedProjects.length / PROJECTS_PER_PAGE);
    const paginatedProjects = useMemo(() => {
        const start = (currentPage - 1) * PROJECTS_PER_PAGE;
        const end = start + PROJECTS_PER_PAGE;
        return filteredAndSortedProjects.slice(start, end);
    }, [currentPage, filteredAndSortedProjects]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <ProjectsSection id="projects">
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
                    Projects
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    A curated list of my key software engineering projects, categorized for easy review.
                </Typography>
            </Box>

            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={handleFilterChange}
                    size={isMobile ? 'small' : 'medium'}
                    aria-label="project category filter"
                >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="full-stack">Full Stack</ToggleButton>
                    <ToggleButton value="frontend">Front End</ToggleButton>
                    <ToggleButton value="backend">Back End</ToggleButton>
                    <ToggleButton value="ai-ml">AI/ML</ToggleButton>
                    <ToggleButton value="space-science">Space</ToggleButton>
                </ToggleButtonGroup>

                <Stack direction="row" spacing={2}>
                    <TextField
                        label="Search projects"
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Sort by</InputLabel>
                        <Select
                            value={sort}
                            onChange={handleSortChange}
                            label="Sort by"
                        >
                            <MenuItem value="newest">Newest</MenuItem>
                            <MenuItem value="oldest">Oldest</MenuItem>
                            <MenuItem value="a-z">A-Z</MenuItem>
                            <MenuItem value="z-a">Z-A</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {paginatedProjects.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Typography variant="h6" color="text.secondary">No projects found.</Typography>
                        </Box>
                    ) : (
                        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
                            {paginatedProjects.map((project, i) => (
                                <motion.div key={project.id} variants={itemVariants}>
                                    <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                                        <ProjectCard component="div" sx={{ mb: 2 }}>
                                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{project.title}</Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{project.description}</Typography>
                                                </Box>
                                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginLeft: 'auto', flexWrap: 'wrap' }}>
                                                    {(project.techStack || []).slice(0, 8).map((t, i) => <Chip key={i} label={t} size="small" variant="outlined" />)}
                                                </Stack>
                                            </Box>
                                        </ProjectCard>
                                    </Link>
                                </motion.div>
                            ))}
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            siblingCount={1}
                            boundaryCount={1}
                            showFirstButton
                            showLastButton
                            aria-label="Project pages"
                        />
                    </Box>
                </>
            )}
        </ProjectsSection>
    );
};

export default Projects;