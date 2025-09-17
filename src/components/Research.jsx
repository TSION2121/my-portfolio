// src/components/Research.jsx
import React, { useMemo, useState } from 'react';
import {
    Box,
    CircularProgress,
    Chip,
    Button,
    Pagination,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import db from '../../db.json'; // Directly import the JSON data
import { ResearchSection, ResearchCard } from '../styles/Research.styles';

const RESEARCH_PER_PAGE = 6;
const ALL_RESEARCH = db.research;

// --- Framer Motion variants for animations ---
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
    visible: { y: 0, opacity: 1 },
};

const Research = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredResearch = useMemo(() => {
        let research = [...ALL_RESEARCH];
        if (search) {
            research = research.filter(
                (r) =>
                    r.title.toLowerCase().includes(search.toLowerCase()) ||
                    r.abstract.toLowerCase().includes(search.toLowerCase()) ||
                    r.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()))
            );
        }
        return research;
    }, [search]);

    const totalPages = Math.ceil(filteredResearch.length / RESEARCH_PER_PAGE);
    const paginatedResearch = useMemo(() => {
        const start = (currentPage - 1) * RESEARCH_PER_PAGE;
        const end = start + RESEARCH_PER_PAGE;
        return filteredResearch.slice(start, end);
    }, [currentPage, filteredResearch]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <ResearchSection>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
                    Research & Publications
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    A compilation of my academic research, technical papers, and published work.
                </Typography>
            </Box>

            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <TextField
                    label="Search research"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </Box>

            {false ? ( // Faking loading state for a moment
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {paginatedResearch.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Typography variant="h6" color="text.secondary">No research found.</Typography>
                        </Box>
                    ) : (
                        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
                            {paginatedResearch.map((item, i) => (
                                <motion.div key={item.id} variants={itemVariants}>
                                    <Link to={`/research/${item.id}`} style={{ textDecoration: 'none' }}>
                                        <ResearchCard sx={{ mb: 2 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                                                    {item.authors && <Typography variant="subtitle2" color="text.secondary" sx={{ fontStyle: 'italic' }}>{item.authors.join(', ')}</Typography>}
                                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{item.abstract}</Typography>
                                                </Box>
                                                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                                                    {(item.keywords || []).slice(0, 6).map((k) => <Chip key={k} label={k} size="small" variant="outlined" />)}
                                                </Stack>
                                            </Box>
                                        </ResearchCard>
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
                            aria-label="Research pages"
                        />
                    </Box>
                </>
            )}
        </ResearchSection>
    );
};

export default Research;