import React, { useEffect, useMemo, useState } from 'react';
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
import {
    ProjectsSection,
    ProjectGrid,
    ProjectCard,
} from '../styles/Projects.styles.js';

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
    'framer motion', 'html', 'typescript', 'javascript'
]);

const aiTechs = new Set([
    'tensorflow', 'keras', 'pytorch', 'scikit-learn', 'sklearn', 'opencv',
    'numpy', 'pandas', 'torch', 'transformers'
]);

const backendRoles = new Set(['backend', 'api', 'server', 'database', 'devops', 'integration']);
const frontendRoles = new Set(['frontend', 'ui', 'ux', 'client', 'design']);
const aiRoles = new Set(['ml', 'ai', 'data-science', 'research', 'cv', 'nlp']);

// Normalize helper
const normalize = (s) => (String(s || '')).toLowerCase().trim();

// Semantic category matcher
function projectMatchesSemanticCategory(project, semanticCategory) {
    if (!semanticCategory || semanticCategory === 'all') return true;

    const cat = normalize(project.category);
    const roles = (project.roles || []).map(normalize);
    const techs = (project.techStack || []).map(normalize);

    const hasBackendTech = techs.some(t => backendTechs.has(t));
    const hasFrontendTech = techs.some(t => frontendTechs.has(t));
    const hasAiTech = techs.some(t => aiTechs.has(t));

    const hasBackendRole = roles.some(r => backendRoles.has(r));
    const hasFrontendRole = roles.some(r => frontendRoles.has(r));
    const hasAiRole = roles.some(r => aiRoles.has(r));

    switch (semanticCategory) {
        case 'backend':
            if (cat === 'backend') return true;
            if (hasBackendRole || hasBackendTech) return true;
            // include full-stack with backend signal
            if (cat === 'full-stack' && (hasBackendTech || hasBackendRole)) return true;
            return false;
        case 'frontend':
            if (cat === 'frontend') return true;
            if (hasFrontendRole || hasFrontendTech) return true;
            if (cat === 'full-stack' && (hasFrontendTech || hasFrontendRole)) return true;
            return false;
        case 'ai-ml':
        case 'ai':
            if (cat === 'ai-ml' || cat === 'ai') return true;
            if (hasAiRole || hasAiTech) return true;
            if (cat === 'full-stack' && (hasAiTech || hasAiRole)) return true;
            return false;
        case 'space-science':
            if (cat === 'space-science') return true;
            // consider keywords / roles for space-science if provided
            if (roles.some(r => r.includes('space') || r.includes('mbse') || r.includes('celestial'))) return true;
            if (techs.some(t => t.includes('capella') || t.includes('valispace') || t.includes('astronom'))) return true;
            return false;
        default:
            // strict equality for other categories (engineering, meta, full-stack, etc.)
            return cat === normalize(semanticCategory);
    }
}

const categoryColors = {
    frontend: 'primary',
    backend: 'secondary',
    'full-stack': 'success',
    'ai-ml': 'warning',
    engineering: 'info',
    'space-science': 'error',
    meta: 'default',
};

// Framer variants
const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, boxShadow: '0 8px 28px rgba(0,0,0,0.08)' },
};

// Main component
const Projects = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedTech, setSelectedTech] = useState(''); // single-select dropdown
    const [selectedTechsMulti, setSelectedTechsMulti] = useState([]); // multi-select chips
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState(() => localStorage.getItem('projects:viewMode') || 'list');

    const projectsPerPage = 6;

    useEffect(() => {
        // fetch projects from json-server
        fetch('http://localhost:4000/projects')
            .then((r) => {
                if (!r.ok) throw new Error('Network response not ok');
                return r.json();
            })
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setError(true);
                setLoading(false);
            });
    }, []);

    // persist viewMode
    useEffect(() => {
        localStorage.setItem('projects:viewMode', viewMode);
    }, [viewMode]);

    // derived lists
    const categories = useMemo(() => ['all', ...Array.from(new Set(projects.map(p => p.category || 'uncategorized')))], [projects]);
    const allTechs = useMemo(() => [...new Set(projects.flatMap(p => p.techStack || []))].sort(), [projects]);

    // Filter logic (search + semantic category + tech filters + multi-tech chips)
    const filteredProjects = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return projects.filter((project) => {
            // search across title, description, details, and techStack
            const matchesSearch = term === '' || [
                project.title,
                project.description,
                project.details,
                ...(project.techStack || [])
            ].some(field => String(field || '').toLowerCase().includes(term));

            // semantic category
            const matchesCategorySemantic = projectMatchesSemanticCategory(project, activeCategory);

            // single tech dropdown match (optional)
            const matchesSelectedTech = selectedTech === '' || (project.techStack || []).includes(selectedTech);

            // multi-select tech chips: all selected chips must be present (AND) - change to OR if preferred
            const matchesMultiTechs = selectedTechsMulti.length === 0 || selectedTechsMulti.every(t => (project.techStack || []).includes(t));

            return matchesSearch && matchesCategorySemantic && matchesSelectedTech && matchesMultiTechs;
        });
    }, [projects, searchTerm, activeCategory, selectedTech, selectedTechsMulti]);

    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
    const paginatedProjects = filteredProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);

    useEffect(() => {
        // reset page when filters/search change
        setCurrentPage(1);
    }, [searchTerm, activeCategory, selectedTech, selectedTechsMulti]);

    // handlers
    const handlePageChange = (e, val) => {
        setCurrentPage(val);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleViewChange = (e, newView) => {
        if (newView) setViewMode(newView);
    };

    const toggleTechChip = (tech) => {
        setSelectedTechsMulti(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
    };

    if (loading) {
        // skeleton loader
        return (
            <ProjectsSection id="projects">
                <Typography variant={isMobile ? 'h5' : 'h4'} align="center" gutterBottom>Projects</Typography>
                <Box sx={{ display: 'grid', gap: 2, maxWidth: 1100, margin: '0 auto' }}>
                    {[...Array(6)].map((_, i) => <Skeleton key={i} variant="rectangular" height={96} />)}
                </Box>
            </ProjectsSection>
        );
    }

    if (error) {
        return (
            <ProjectsSection id="projects">
                <Typography variant="h6" color="error" align="center">Failed to load projects. Try restarting json-server.</Typography>
            </ProjectsSection>
        );
    }

    return (
        <ProjectsSection id="projects">
            <Typography variant={isMobile ? 'h5' : 'h4'} align="center" gutterBottom>Projects</Typography>

            <Box sx={{ maxWidth: 720, mx: 'auto', mb: 1 }}>
                <TextField
                    fullWidth
                    size="small"
                    label="Search title, description, or tech"
                    placeholder="e.g., Spring Boot, React, lunar habitat"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    inputProps={{ 'aria-label': 'Search projects' }}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <ButtonGroup variant="outlined" size="small" aria-label="Category filters">
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            variant={activeCategory === cat ? 'contained' : 'outlined'}
                        >
                            {cat === 'all' ? 'All' : String(cat).replace('-', ' ')}
                        </Button>
                    ))}
                </ButtonGroup>

                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel id="tech-select-label">Tech</InputLabel>
                    <Select
                        labelId="tech-select-label"
                        value={selectedTech}
                        label="Tech"
                        onChange={(e) => setSelectedTech(e.target.value)}
                        renderValue={(v) => v || 'All'}
                    >
                        <MenuItem value=''>All</MenuItem>
                        {allTechs.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                    </Select>
                </FormControl>

                <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewChange} size="small" aria-label="View mode">
                    <ToggleButton value="list">List</ToggleButton>
                    <ToggleButton value="grid">Grid</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Multi-select tech chips */}
            <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 2 }}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                    {allTechs.slice(0, 30).map(tech => ( // show top 30 to avoid overflow; optionally compute frequency
                        <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            onClick={() => toggleTechChip(tech)}
                            color={selectedTechsMulti.includes(tech) ? 'primary' : 'default'}
                            clickable
                            sx={{ marginBottom: 0.5 }}
                            aria-pressed={selectedTechsMulti.includes(tech)}
                        />
                    ))}
                    {allTechs.length > 30 && <Chip label={`+${allTechs.length - 30} more`} size="small" />}
                </Stack>
            </Box>

            {/* Results */}
            {filteredProjects.length === 0 ? (
                <Typography variant="body1" align="center" sx={{ mt: 4 }}>No projects match your filters.</Typography>
            ) : (
                <>
                    {viewMode === 'grid' ? (
                        <ProjectGrid>
                            {paginatedProjects.map((project, idx) => (
                                <motion.div key={project.id}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            whileHover="hover"
                                            transition={{ duration: 0.36, delay: idx * 0.04 }}
                                >
                                    <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                                        <ProjectCard sx={project.category === 'space-science' ? {
                                            border: '2px solid #ff4081',
                                            background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                                            color: '#fff'
                                        } : {}}>
                                            <Typography variant="h6" component="h3">{project.title}</Typography>
                                            <Chip label={project.category} color={categoryColors[project.category] || 'default'} size="small" sx={{ mt: 0.5 }} />
                                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>{project.description}</Typography>
                                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1 }}>
                                                {(project.techStack || []).map((t, i) => <Chip key={i} label={t} size="small" variant="outlined" />)}
                                            </Stack>
                                        </ProjectCard>
                                    </Link>
                                </motion.div>
                            ))}
                        </ProjectGrid>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {paginatedProjects.map((project, idx) => (
                                <motion.div key={project.id}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            whileHover="hover"
                                            transition={{ duration: 0.32, delay: idx * 0.03 }}
                                >
                                    <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                                        <ProjectCard sx={project.category === 'space-science' ? {
                                            border: '2px solid #ff4081',
                                            background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                                            color: '#fff'
                                        } : {}}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                                                <Box sx={{ flex: 1, minWidth: 220 }}>
                                                    <Typography variant="h6">{project.title}</Typography>
                                                    <Chip label={project.category} color={categoryColors[project.category] || 'default'} size="small" sx={{ mt: 0.5 }} />
                                                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>{project.description}</Typography>
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
