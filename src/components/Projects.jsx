import React, { useMemo, useState } from 'react';
import {
    Box,
    Chip,
    Pagination,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useMediaQuery,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import db from '../../db.json';
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
    'html', 'javascript', 'typescript', 'js', 'ts', 'emotion'
]);

const aiTechs = new Set(['ai', 'ml', 'machine learning', 'pytorch', 'tensorflow', 'scikit-learn', 'numpy', 'scipy', 'pandas', 'r', 'data science']);

const getCategory = (project) => {
    const projectTechs = new Set((project.techStack || []).map(t => t.toLowerCase()));
    if (Array.from(projectTechs).some(t => aiTechs.has(t))) return 'AI/ML';
    if (Array.from(projectTechs).some(t => backendTechs.has(t))) return 'Backend';
    if (Array.from(projectTechs).some(t => frontendTechs.has(t))) return 'Frontend';
    return 'Other';
};

const itemsPerPage = 6;
const allProjects = db.projects;

const Projects = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [sort, setSort] = useState('Newest');
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const filteredProjects = useMemo(() => {
        let projects = [...allProjects];

        // Filter projects by category
        if (filter !== 'All') {
            projects = projects.filter(project => {
                // Check if the project's 'roles' array includes the filter category
                // or if it includes 'full-stack' for 'frontend' or 'backend' filters
                if (filter === 'Frontend') {
                    return project.roles.includes('frontend') || project.roles.includes('full-stack');
                } else if (filter === 'Backend') {
                    return project.roles.includes('backend') || project.roles.includes('full-stack');
                } else if (filter === 'Full-Stack') {
                    return project.roles.includes('full-stack');
                }
                return getCategory(project) === filter;
            });
        }

        // Filter by search query
        if (searchTerm) {
            const lowerCaseQuery = searchTerm.toLowerCase();
            projects = projects.filter(project =>
                project.title.toLowerCase().includes(lowerCaseQuery) ||
                project.description.toLowerCase().includes(lowerCaseQuery) ||
                (project.techStack || []).some(tech => tech.toLowerCase().includes(lowerCaseQuery))
            );
        }

        // Sort projects
        if (sort === 'Newest') {
            projects.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sort === 'Oldest') {
            projects.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        return projects;
    }, [searchTerm, filter, sort]);

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <ProjectsSection id="projects">
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 700 }}>
                My Projects
            </Typography>

            <Stack
                direction={isSm ? 'column' : 'row'}
                spacing={2}
                sx={{
                    mb: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    mx: 'auto',
                    maxWidth: 1000,
                }}
            >
                <TextField
                    label="Search projects"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: isSm ? '100%' : 'auto', flexGrow: isSm ? 1 : 0 }}
                />

                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={(e, newFilter) => newFilter !== null && setFilter(newFilter)}
                    aria-label="project category filter"
                    size="small"
                >
                    <ToggleButton value="All">All</ToggleButton>
                    <ToggleButton value="Full-Stack">Full-Stack</ToggleButton>
                    <ToggleButton value="Frontend">Frontend</ToggleButton>
                    <ToggleButton value="Backend">Backend</ToggleButton>
                    <ToggleButton value="AI/ML">AI/ML</ToggleButton>
                    <ToggleButton value="Other">Other</ToggleButton>
                </ToggleButtonGroup>

                <FormControl size="small" sx={{ width: isSm ? '100%' : 'auto' }}>
                    <InputLabel id="sort-by-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-by-label"
                        id="sort-by-select"
                        value={sort}
                        label="Sort By"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <MenuItem value="Newest">Newest</MenuItem>
                        <MenuItem value="Oldest">Oldest</MenuItem>
                    </Select>
                </FormControl>
            </Stack>

            {currentProjects.length === 0 ? (
                <Typography sx={{ textAlign: 'center', my: 4 }}>
                    No projects found. Try a different search or filter.
                </Typography>
            ) : (
                <>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <ProjectGrid>
                            {currentProjects.map((project, index) => (
                                <motion.div key={project.id} variants={itemVariants}>
                                    <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                                        <ProjectCard>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography component="h3" variant="h6" sx={{ fontWeight: 600 }}>
                                                        {project.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: 40 }}>
                                                        {project.description}
                                                    </Typography>
                                                </Box>
                                                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                                                    {(project.techStack || []).slice(0, 8).map((t, i) => (
                                                        <Chip key={i} label={t} size="small" variant="outlined" />
                                                    ))}
                                                </Stack>
                                            </Box>
                                        </ProjectCard>
                                    </Link>
                                </motion.div>
                            ))}
                        </ProjectGrid>
                    </motion.div>
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